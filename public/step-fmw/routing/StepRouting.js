/**
 * @author Salvatore Milazzo
 * @description StepContext ,able to do CallStep and ReturnStep 
 * @date 2021
 * @name $tep MVC SPA framework
 * @license MIT
 */

import StepStack from './StepStack.js';
import StepParameters from './StepParameters.js';
import StepUrl from './StepUrl.js';

export default class {

    #stepStack = new StepStack();
    #mementoStack = new StepStack();
    #parametersStack = new StepStack();

    #routes = [];
    #stepLoader;

    constructor(routes, stepLoader) {
        this.#routes = routes;
        this.#stepLoader = stepLoader;

    }

    getInteractionStack() {
        return this.#stepStack;
    }

    #getMementoStack() {
        return this.#mementoStack;
    }

    #getParamsStack() {
        return this.#parametersStack;
    }

    // Examples:
    // routeTo ('/Home','initialize',inputData={},metaInfos={edit_mode:vis,prevLink='/',actualLink='/'})
    // routeTo ('/cats','initialize',inputData={},metaInfos={search_mode:search,prevLink='/',actualLink='/cats'})

    #routeTo = (stepUrl, stepParams, stepContextRef,fromRoute) => {
        history.pushState(null, null, stepUrl.getUrl());
        this.#installStep(stepUrl, stepParams, stepContextRef,fromRoute);
    }

    #createStepParameters(inputData, routePath) {
        let firedRoute = this.#getFiredRoute(window.location.pathname).route;
        let linkCurrentStep = firedRoute.path;
        let linkNextStep = routePath;
        let edit_mode = firedRoute.edit_mode;
        let search_mode = firedRoute.search_mode;
        let title = firedRoute.title;
        let params = StepParameters.createParameters(inputData,
            linkCurrentStep,
            linkNextStep,
            edit_mode,
            search_mode,
            title
        );
        this.#getParamsStack().push(params);
        return params;
    }

    #restoreStepParameters(data) {
        this.#getParamsStack().pop();
        let fromStack = this.#getParamsStack().getCurrent();
        if (fromStack === null) return null;
        fromStack.inputData = data;
        let stepParams = {};
        if (fromStack) {
            stepParams = fromStack;
        } else {
            stepParams = StepParameters.createParameters(data, "/", "/");
        }
        return stepParams;
    }

    // start a new Web Step
    callStep(routePath, callingStepInputData = {}) {
        this.#routeTo(  //  URL+METHOD
            new StepUrl(routePath, 'initialize'),
            // DATA PIU LINKED STEP LINKS
            this.#createStepParameters(callingStepInputData, routePath),
            // ROUTER REF
            this

        );
    }

    // return to a Previous Web Step   
    returnStep(routePath, sourcePath="/",fromStepOutputdata = {}) {

        this.#routeTo( // URL+ CALLBACK
            new StepUrl(routePath, 'callback'),
            // FETCH PREVIOUS LINK STATE AND OVERRIDE WITH OUTPUT DATA
            this.#restoreStepParameters(fromStepOutputdata),
            this,
            sourcePath

        );
    }

    callMethodOfCurrentStep(methodName) {
        this.#routeTo(new StepUrl(window.location.pathname, methodName));
    }

    #getFiredRoute(pathToBeMatched) {
        let firedRoute =
            this.#routes.map(x => {
                return {
                    route: x,
                    fired: pathToBeMatched === x.path
                }
            }
            )
                .find(y => y.fired);

        return firedRoute ? firedRoute : { route: this.#routes[0], fired: true }

    }

    #installStep(stepUrl, stepParams, stepContext,fromRoute) {
        let firedRoute = this.#getFiredRoute(stepUrl.getUrl());
        // factory del controller/step che deve gestire la route sul client spa
        let nextStep = this.#stepLoader.instantiate(
            stepContext,
            firedRoute.route.controller,
            firedRoute.route.args
        );
        let stepMethodToInvoke;
        // NUOVO ROTTA NELL'ALBERO DI NAVIGAZIONE
        if (stepUrl.isAnInitializeRoute()) {
            stepMethodToInvoke = '_initialize';
            // CREATE memento of last interaction || {}
            let statusOld = {};
            let stepOld = this.getInteractionStack().getCurrent();
            if (stepOld) {
                // ATTENZIONE: la creazione del memento da salvare e ripristinare successivamente riguarda 
                // solo il model della phase corrente dell'interazione a wizard.
                // il motivo? tutta la session è già disponibile sul client, il mememnto viene utilizzato 
                // esclusivamente per avere effetti collaterali tra una interazione e la successsiva
                // ma relativamente al model della phase corrente ha senso! 
                statusOld = stepOld.createMemento();
            }
            // install new Step
            this.getInteractionStack().push(nextStep);
            // 3. save Memento on top of a stack
            this.#getMementoStack().push(statusOld);
           
        }
        // RITORNO DI ROTTA NELL'ALBERO DI NAVIGAZIONE
        if (stepUrl.isACallbackRoute()) {
            stepMethodToInvoke = '_callback';
            // estrae dallo stepcontext l'elemento morente
            this.getInteractionStack().pop();
            // per ripristinare lo step, recupero il suo ultimo snapshot dello stato
            let backupMemento = this.#getMementoStack().getCurrent();
            //26052021 bugfix
            if (backupMemento) {
                if (backupMemento.getMementoState()) {
                    nextStep.installMemento(backupMemento);
                    // cancello una posizione dallo stack degli stati
                    this.#getMementoStack().pop();
                }
            }
        }
        if (stepUrl.getMethod() === 'conferma') {
            stepMethodToInvoke = 'conferma';
        }
        //  INVOCA IL GIUSTO METHOD DINAMICAMENTE
        if (stepParams) {
            if (stepMethodToInvoke==='_callback'){
            this.getInteractionStack().getCurrent()[stepMethodToInvoke](
                stepParams.inputData,
                stepParams.metaInfo,
                fromRoute
            );
        }
        else{
            this.getInteractionStack().getCurrent().setFlatUrl(stepUrl.getUrl());
            this.getInteractionStack().getCurrent()[stepMethodToInvoke](
                stepParams.inputData,
                stepParams.metaInfo);
        }
        }
    }
}