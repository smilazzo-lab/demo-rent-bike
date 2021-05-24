/**
 * @author Salvatore Milazzo
 * @description StepRouter ,able to do CallStep and ReturnStep 
 * @date 2021
 * @name $tep MVC SPA framework
 * @license MIT
 */

import StepStack  from './StepStack.js';
import MementoStack from './MementoStack.js';
import CrossStepMetaInfo from './CrossStepMetaInfo.js';


export default  class  {
   
    #stepStack = new StepStack(); 
    #mementoStack = new MementoStack();
    #routes =[];
    #stepLoader={};
    #metaInfoStack=[];

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

    #routeTo = (url,method,data,metaInfos,routerRef) => {
      // if( url.indexOf('lookup') === -1) {
           console.log("push state->");
            history.pushState(null,null,url);
      //  }
       // window.location.pathname=url;
        this.#router(method,data,metaInfos,routerRef);
    }

    #createMetaInfosByRoutePath(routePath) {
        let firedRoute= this.#getFiredRoute(window.location.pathname).route;
        let linkCurrentStep = firedRoute.path;
        let linkNextStep = routePath;
        let edit_mode= firedRoute.edit_mode;
        let search_mode = firedRoute.search_mode;
        let title =firedRoute.title;
        let meta_info=CrossStepMetaInfo.createMetaInfo(linkCurrentStep,
                                                       linkNextStep,
                                                       edit_mode,
                                                       search_mode,
                                                       title
                     );
        this.#metaInfoStack.push(meta_info);
        return meta_info;
    }

    #getCurrentMetaInfos() {
        let indexUltimo = this.#metaInfoStack.length;
        if (indexUltimo>0){
            return this.#metaInfoStack[indexUltimo-1];
        }else{
            return null;
        }
    }

    #restoreMetaInfos() {
        this.#metaInfoStack.pop();
        let restoreLinks =this.#getCurrentMetaInfos();
        let metaInfo= {};
        if (restoreLinks){
            metaInfo=restoreLinks;
        }else{
            metaInfo = CrossStepMetaInfo.createMetaInfo("/","/");
        }
        return metaInfo;
    }
    // start a new Web Step
    callStep(routePath, data) {
        this.#routeTo(routePath,
                      'initialize',
                      data,
                      this.#createMetaInfosByRoutePath(routePath),
                      this // il riferimento al Router stesso
            );
        }
     // return to a Previous Web Step   
    returnStep(routhPath,data) {
        this.#routeTo(routhPath,
                      'callback',
                      data,
                      this.#restoreMetaInfos()
          );
        }

    callMethodOfCurrentStep(methodName){
        this.#routeTo(window.location.pathname,methodName);
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

    #router(method,data,metaInfos,routerRef) {
        let firedRoute = this.#getFiredRoute(window.location.pathname);
        if (method==='initialize') {
            // CREATE memento of last interaction || {}
            let statusOld ={};
            let stepOld = this.getInteractionStack().getCurrentStep();
            if (stepOld){
                statusOld=stepOld.createMemento();
            } 
            // 1. class For Name
            let nextStep = 
            this.#stepLoader.instantiate(routerRef, firedRoute.route.controller, 
                firedRoute.route.args
            );
            // 2. install new Step
            this.getInteractionStack().push(nextStep);
            // 3. save Memento on top of a stack
            this.#getMementoStack().push(statusOld);
            // 4. execute next step
            nextStep._initialize(data,metaInfos);
           
        }
        if (method==='callback') {
            // estrae dallo stepcontext l'elemento morente
            this.getInteractionStack().pop();
            let stepLanding=this.getInteractionStack().getCurrentStep();
            let backupMementoStepLanding=this.#getMementoStack()
                                         .getCurrentMemento();
            stepLanding.installMemento(backupMementoStepLanding);
            // cancello una posizione dallo stack degli stati
            this.#getMementoStack().pop();
            stepLanding._callback(data,metaInfos);
         }
        if (method==='conferma'){
            this.getInteractionStack().getCurrentStep()[method]();
        }
    }
}