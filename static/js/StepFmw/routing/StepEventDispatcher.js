/**
 * @author Salvatore Milazzo
 * @description EventDispatcher ,able to manage user actions 
 * @date 2021
 * @name $tep MVC SPA framework
 * @license MIT
 */

import StepRouter from "./StepRouter.js";

export default class  {
  
    #router;
 
    constructor() {
       
    }

    startListening(jsonRoutes,stepLoader) {
        console.log("startListening...");
        this.#router = new StepRouter(jsonRoutes,stepLoader);
        this.#router.callStep("/",JSON.stringify({}));
        // Install the Dispatcher
        document.body.addEventListener("click", e=> {
            if (e.target.matches("[data-link]")) {
                 let index = e.target.id.split('-')[1];
                 let comando = e.target.id.split('-')[2];
                 let i = e.target.name;
                 e.preventDefault();
                 /**
                  * gestione 'Annulla/Indietro'
                  */
                 if (comando==='avanti') {
                     this.#router.
                     getInteractionStack()
                     .getCurrentStep()
                     .avanti();
                }
                 if (comando==='indietro') {
                    this.#router
                    .getInteractionStack()
                    .getCurrentStep()
                    .indietro();
                }
                 if (comando==='annulla') {
                    this.#router
                    .returnStep(e.target.pathname,JSON.stringify({}));
                }
                 // aggiornamento entity
                 if (comando==='conferma') {
                    this.#router
                    .callMethodOfCurrentStep('conferma');
                } // cliccare si su confirm dialog
                 if (comando==='confirm_yes') {
                    this.#router
                    .returnStep(e.target.pathname,JSON.stringify({command:'yes'}));
                }
                 else if (comando==='menu'){
                     this.#router
                     .getInteractionStack()
                     .reset();
                     this.#router
                     .callStep(e.target.pathname,JSON.stringify({}));
                }  
                 /**
                  * Sezione per la gestione del lookup
                  */
                 else if (comando==='lookup'){
                     this.#router
                     .callStep(e.target.pathname,JSON.stringify({}));
                 }
                 else if (comando==='lookup.search') {
                     let criteria =  this.#router.getInteractionStack().getCurrentStep().getCriteria();
                     this.#router
                     .getInteractionStack()
                     .getCurrentStep()
                     .doLookupSearch(JSON.stringify(criteria));
                 }
                 else if (comando==='lookup.pick') {
                     let selected = JSON.parse(this.#router.getInteractionStack().getCurrentStep().pickElement(index));
                     this.#router
                     .returnStep(e.target.pathname,JSON.stringify(selected));
                 }
                else if (comando==='listamc.vis'){
                     this.#router
                    .callStep(e.target.pathname,
                              this.#router
                              .getInteractionStack()
                              .getCurrentStep()
                              .getElementOfCollection(index));
                     }
                 }
         });
    }
    
    popStateListening(jsonRoutes,stepLoader) {
        
        window.onpopstate = function(event) {
     
        let backRouter = new StepRouter(jsonRoutes,stepLoader);
        backRouter.callStep(window.location.pathname,JSON.stringify({}));
    }
    }

}