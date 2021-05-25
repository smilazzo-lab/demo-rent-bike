/** 
 * @author Salvatore Milazzo
 * @description AbstractStep ,is the Unit Of Work in web step 
               lyfecycle gestito completamente dal client
               Client : StepRouter

               createMemento -- estrae lo stato in un oggetto Memento, per conservarlo 
               installMemento -- ripristina lo stato quando si ritorna alla interazione

               Metodi astratti
               OVERRIDE METODS:

               bindingModel --   è il model (detail o collection) dello step
               setBindingModel() viene usato per incapsulare lo stato ed è usato per il memento
               getBingingModel() viene usato per ottenere lo stato ed è usato sia per memento
                                 che per associare la validazione e il bind2way con la view
               getValidator()--  restituisce al client il validatore per questo step
               initialize  --    il metodo utilizzato quando c'è una callStep, i parametri di ingresso
                                 dallo step chiamante sono dentro inputData
               callback  ---     il metodo utilizzato quando si ritorna indietro di uno step

 * @date 2021
 * @name $tep MVC SPA framework
 * @license MIT
 */

import Observable from "../data-binding/Observable.js";
import createMemento from '../data-binding/Memento.js';

export default class  {
   
    #target='';
    inputData ={};
    meta={};
    options=[];
    #_$tep_context_ref;  // per fare la callStep da dentro i metodi

    constructor(stepContext,specificato,options) {
        console.log("specificatoTarget="+specificato);
        this.#target = specificato;
        this.options = options;
        this.#_$tep_context_ref=stepContext;
    }

    getStepContext() {
        return this.#_$tep_context_ref;
    }
    
    getEditMode(){
        return this.meta['edit_mode'];
    }

    getSearchMode() {
        return this.meta['search_mode'];
    }

    setSearchMode(newMode){
        this.meta['search_mode']=newMode;
    }

    getBindingModel(){
        return null;
    }

    setBindingModel() {
        return null;
    }

    getValidator() {
        throw new Error('getValidator is abstract');
    }

    applyBindings(model) {
       document.querySelectorAll("[data-bind]").forEach(elem => {
       let obs = model[elem.getAttribute("data-bind")];
       if (obs instanceof Observable){
            obs = new Observable(obs.value);
        }else{
            obs = new Observable(obs);
        }
        model[elem.getAttribute("data-bind")]=obs;
        obs.bindToHtmlElement(elem,this.getValidator());
       });
    }

    setInputData(inpData) {
        this.inputData=inpData;
    }

    setMetaInfo(steplinks) {
        this.meta=steplinks;
    }

    getInputData (){
        return this.inputData;
    }

    setElTargetByID(targetId) {
        this.#target= targetId;
    }

    #renderHTML(html) {
        document.querySelector(this.#target).innerHTML=html;
    }

    setTabTitle(name) {
        document.title=name;
    }
    
    buildModel() {
        throw new Error(' abstract method!');
   }
     
   initialize() {
        throw new Error('not implemented');
   }

    // backdoor
   _callback(inputdata,m) {
        this.setInputData(inputdata);
        this.setMetaInfo(m);
        this.callback();
        this.renderView();
    }
    
    callback() {
        throw new Error('not implemented')
    }

    async asyncFetchHtmlTemplate() {
        throw new Error('error');
    }

    async asyncFetchHtmlTemplateParam(templateUrl, templateData) {
        let t = JSON.parse(templateData);
        t.meta = this.meta;

        const postData = {
           method: 'POST', // *GET, POST, PUT, DELETE, etc.
           mode: 'cors', // no-cors, *cors, same-origin
           cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
           credentials: 'same-origin', // include, *same-origin, omit
           headers: {
             'Content-Type': 'application/json'
           },
           redirect: 'follow', // manual, *follow, error
           referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
           body:  JSON.stringify(t)
         };
         return fetch(templateUrl, postData); 
    }

    renderView() {
        this.#renderHTML('<div id="loader" class="loader"></div>');
        this.asyncFetchHtmlTemplate()
              .then((html)=> html.text())
              .then(html => { this.#renderHTML(html);
                              if (this.getBindingModel()!==null) {
                                  // 2 way binding
                                  this.applyBindings(this.getBindingModel());
                                 }
                            }
                    );
    }

    // Memento Pattern for Progressive Web Apps
    createMemento()  {
        let memento = createMemento(this);
        memento.setMementoState(this,this.getBindingModel());
        return memento;
    }

    installMemento(memento) {
        console.log("install memento in callback");
        this.setBindingModel(memento.getMementoState(this));
    }
   
}