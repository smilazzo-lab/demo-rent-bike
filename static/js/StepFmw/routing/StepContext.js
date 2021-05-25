/**
 * @author Salvatore Milazzo
 * @description StepContext ,able to do CallStep and ReturnStep 
 * @date 2021
 * @name $tep MVC SPA framework
 * @license MIT
 */

import StepStack  from './StepStack.js';
import MementoStack from './MementoStack.js';
import StepParameters from './StepParameters.js';
import StepUrl from './StepUrl.js';


export default  class  {
   
    #stepStack = new StepStack(); 
    #mementoStack = new MementoStack();
    #routes =[];
    #stepLoader={};
    #parametersStack=[];

    constructor(routes,sl) {
     this.#routes = routes;
     this.#stepLoader=sl;
    }

    getInteractionStack(){
        return this.#stepStack;
    }

    #getMementoStack() {
        return this.#mementoStack;
    }
   
   // Examples:
   // routeTo ('/Home','initialize',inputData={},metaInfos={edit_mode:vis,prevLink='/',actualLink='/'})
   // routeTo ('/cats','initialize',inputData={},metaInfos={search_mode:search,prevLink='/',actualLink='/cats'})

    #routeTo = (stepUrl,stepParams,stepContextRef) => {
       if( stepUrl.getUrl().indexOf('lookup.search') === -1) {
           console.log("push state->");
            history.pushState(null,null,stepUrl.getUrl());
        }
       this.#installStep(stepUrl,stepParams,stepContextRef);
    }

    #createStepParameters(inputData,routePath) {
        let firedRoute= this.#getFiredRoute(window.location.pathname).route;
        let linkCurrentStep = firedRoute.path;
        let linkNextStep = routePath;
        let edit_mode= firedRoute.edit_mode;
        let search_mode = firedRoute.search_mode;
        let title =firedRoute.title;
        let params=StepParameters.createParameters(inputData,
                                                   linkCurrentStep,
                                                   linkNextStep,
                                                   edit_mode,
                                                   search_mode,
                                                   title
                     );
        this.#parametersStack.push(params);
        return params;
    }

    #getCurrentParameters() {
        let indexUltimo = this.#parametersStack.length;
        if (indexUltimo>0){
            return this.#parametersStack[indexUltimo-1];
        }else{
            return null;
        }
    }

    #restoreStepParameters(data) {
        this.#parametersStack.pop();
        let fromStack =this.#getCurrentParameters();
        fromStack.inputData=data;
        let stepParams= {};
        if (fromStack){
            stepParams=fromStack;
        }else{
            stepParams = StepParameters.createParameters(data,"/","/");
        }
        return stepParams;
    }

    // start a new Web Step
    callStep(routePath, callingStepInputData={}) {
        this.#routeTo(  //  URL+METHOD
                        new StepUrl(routePath,'initialize'),
                        // DATA PIU LINKED STEP LINKS
                        this.#createStepParameters(callingStepInputData,routePath),
                        // ROUTER REF
                        this  
            );
    }

     // return to a Previous Web Step   
    returnStep(routePath,fromStepOutputdata={}) {
       
        this.#routeTo( // URL+ CALLBACK
                      new StepUrl(routePath,'callback'),
                      // FETCH PREVIOUS LINK STATE AND OVERRIDE WITH OUTPUT DATA
                      this.#restoreStepParameters(fromStepOutputdata),
                      this
          );
        }

    callMethodOfCurrentStep(methodName){
        this.#routeTo(new StepUrl(window.location.pathname,methodName));
    }

    #getFiredRoute(pathToBeMatched) {
         let firedRoute = 
          this.#routes.map(x => {
                          return {route: x, 
                                  fired: pathToBeMatched=== x.path
                                  }
                                }
                        )
                      .find(y => y.fired);

        return firedRoute ? firedRoute : {route:this.#routes[0],fired:true}
        
    }

    #installStep(stepUrl, stepParams, stepContext) {
        let firedRoute = this.#getFiredRoute(window.location.pathname);
        if (stepUrl.isAnInitializeRoute()) {
            // CREATE memento of last interaction || {}
            let statusOld ={};
            let stepOld = this.getInteractionStack().getCurrentStep();
            if (stepOld){
                statusOld=stepOld.createMemento();
            } 
            // 1. Istantiate for Name, a Controller(Step)
            let nextStep = 
            this.#stepLoader.instantiate(stepContext, 
                                         firedRoute.route.controller, 
                                         firedRoute.route.args
                 );
            // 2. install new Step
            this.getInteractionStack().push(nextStep);
            // 3. save Memento on top of a stack
            this.#getMementoStack().push(statusOld);
            // 4. execute next step
            // es. {  inputData : {},
            //        metaInfo : { edit_mode:'vis', calledLink='/' calling='/cats'}
            //    
            // }
            nextStep._initialize(stepParams.inputData,
                                 stepParams.metaInfo
            );
           
        }
        if (stepUrl.isACallbackRoute()) {
            // estrae dallo stepcontext l'elemento morente
            this.getInteractionStack().pop();
            let stepLanding=this.getInteractionStack().getCurrentStep();
            let backupMementoStepLanding=this.#getMementoStack()
                                         .getCurrentMemento();
            stepLanding.installMemento(backupMementoStepLanding);
            // cancello una posizione dallo stack degli stati
            this.#getMementoStack().pop();
            
            stepLanding._callback(stepParams.inputData,
                                  stepParams.metaInfo
                                  );
         }
        if (stepUrl.getMethod()==='conferma'){
            this.getInteractionStack().getCurrentStep()[method]();
        }
    }
}