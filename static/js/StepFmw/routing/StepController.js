/**
 * @author Salvatore Milazzo
 * @description StepContext ,able to manage user actions 
 * @date 2021
 * @name $tep MVC SPA framework
 * @license MIT
 */

import StepContext from "./StepContext.js";

export default class  {
  
    #_$tep_context;
 
    constructor() {
       
    }

    startListening(jsonRoutes,stepLoader) {
       
        this.#_$tep_context = new StepContext(jsonRoutes,stepLoader);
        this.#_$tep_context.callStep("/");

        this.#popStateListening(this.#_$tep_context);
        
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
                     this.#_$tep_context.
                     getInteractionStack()
                     .getCurrentStep()
                     .avanti();
                }
                 if (comando==='indietro') {
                    this.#_$tep_context
                    .getInteractionStack()
                    .getCurrentStep()
                    .indietro();
                }
                 if (comando==='annulla') {
                    this.#_$tep_context
                    .returnStep(e.target.pathname);
                }
                 // aggiornamento entity
                 if (comando==='conferma') {
                    this.#_$tep_context
                    .callMethodOfCurrentStep('conferma');
                } // cliccare si su confirm dialog
                 if (comando==='confirm_yes') {
                    this.#_$tep_context
                    .returnStep(e.target.pathname,{command:'yes'});
                }
                 else if (comando==='menu'){
                     this.#_$tep_context
                     .getInteractionStack()
                     .reset();
                     this.#_$tep_context
                     .callStep(e.target.pathname);
                }  
                 /**
                  * Sezione per la gestione del lookup
                  */
                 else if (comando==='lookup'){
                     this.#_$tep_context
                     .callStep(e.target.pathname);
                 }
                 else if (comando==='lookup.search') {
                     let criteria =  this.#_$tep_context
                     .getInteractionStack().getCurrentStep().getCriteria();
                     
                     this.#_$tep_context
                     .getInteractionStack()
                     .getCurrentStep()
                     .doLookupSearch(criteria);
                 }
                 else if (comando==='lookup.pick') {
                     let selected = this.#_$tep_context.getInteractionStack().
                                    getCurrentStep().pickElement(index);

                     this.#_$tep_context.returnStep(e.target.pathname,selected);
                 }
                else if (comando==='listamc.vis'){
                     this.#_$tep_context
                    .callStep(e.target.pathname,
                              this.#_$tep_context
                              .getInteractionStack()
                              .getCurrentStep()
                              .getElementOfCollection(index));
                     }
                 }
         });
    }
    
    #popStateListening(stepContextRef) {
        
        window.onpopstate = function(event) {
        stepContextRef.returnStep(window.location.pathname);
    }
}

}