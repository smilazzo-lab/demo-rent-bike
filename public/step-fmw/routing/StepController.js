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
                     .getCurrent()
                     .avanti();
                }
                 if (comando==='indietro') {
                    this.#_$tep_context
                    .getInteractionStack()
                    .getCurrent()
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
                     .getInteractionStack().getCurrent().getCriteria();
                     
                     this.#_$tep_context
                     .getInteractionStack()
                     .getCurrent()
                     .doLookupSearch(criteria);
                 }
                 else if (comando==='lookup.pick') {
                     let selected = this.#_$tep_context.getInteractionStack().
                                    getCurrent().pickElement(index);

                     this.#_$tep_context.returnStep(e.target.pathname,selected);
                 }
                else if (comando==='listamc.vis'){
                     this.#_$tep_context
                    .callStep(e.target.pathname,
                              this.#_$tep_context
                              .getInteractionStack()
                              .getCurrent()
                              .getElementOfCollection(index));
                     }
                 }
         });
    }
    
    #popStateListening(stepContextRef) {
        var flg=0;
        window.onpopstate = function(event) {
            // nota : qui è gia cambiato
            console.log("pathname="+window.location.pathname);
            if (flg===0) {
                if ("/"===window.location.pathname){
                    flg=1;
                    stepContextRef.returnStep('/');
         
                }else{
                    stepContextRef.returnStep(window.location.pathname);
                }
            }

            if (flg===1){
                if ("/"===window.location.pathname){
                    window.location.pathname='/';
                }else{
                    flg=0;
                    stepContextRef.returnStep(window.location.pathname);
                
                }
            }
    }
}

}