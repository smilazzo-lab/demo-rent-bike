/** 
 * @author Salvatore Milazzo
 * @description AbstractStep ,is the Unit Of Work in web step 
               lyfecycle gestito completamente dal client
               Client : StepRouter

               createMemento -- estrae lo stato in un oggetto Memento, per conservarlo 
               installMemento -- ripristina lo stato quando si ritorna alla interazione
 * @date 2021
 * @name $tep MVC SPA framework
 * @license MIT
 */

import createMemento from '../data-binding/Memento.js';

export default class  {
   
    #target;
    inputData ={};
    meta={};
    options=[];
    #_$tep_context_ref;  // per fare la callStep da dentro i metodi
    #injectetUi;

    constructor(uiRef,stepContext,specificato,options) {
         this.#target = specificato;
        this.options = options;
        this.#_$tep_context_ref=stepContext;
        this.#injectetUi=uiRef;
        
    }

    getAutoBindingRootModel () {
        for (const prop in this) {
          if (this.hasOwnProperty(prop)) {
                  if (prop.startsWith('$_model')){
                      return this[prop];
              }
          }
        }
        throw new Error ('$_model+'+" --> model context autowired not found");
    }

    getAutoBindingModel (phase=0) {
        let rootStepModel = this.getAutoBindingRootModel();
        for (const prop in rootStepModel) {
          if (rootStepModel.hasOwnProperty(prop)) {
                  if (prop.startsWith('$_'+phase+'___')){
                             // attenzione: creazione dinamica di proprietà
                              rootStepModel[prop].shadowPhase=phase;
                              return rootStepModel[prop];
              }
          }
        }
        throw new Error ('$_'+phase+"___  --> model context autowired not found");
      }

      setBindingModel(memento) {
        let rootStepModel = this.getAutoBindingRootModel();
        let phase =memento.shadowPhase;
     
        for (const prop in rootStepModel) {
            if (rootStepModel.hasOwnProperty(prop)) {
                    if (prop.startsWith('$_'+phase+"___")){
                        console.log("---trovato!")
                            rootStepModel[prop] = memento;
                }
            }
          }
      }
    
      getBindingModel() {
        let modelRef=null;
       if (this.getCurrentPhase) {
            modelRef = this.getAutoBindingModel(this.getCurrentPhase());
       }else{
            modelRef= this.getAutoBindingModel();
        }
        if (!modelRef) {
            throw new Error(' non è presente un model per $tep');
        }
    return modelRef;
    }
      
    

   getWebUi() {
       return this.#injectetUi;
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

    getValidator() {
        throw new Error('getValidator is abstract');
    }

    setInputData(inpData) {
        this.inputData=inpData;
    }

    setMetaInfo(steplinks) {
        this.meta=steplinks;
    }

    getMetaInfo() {
        return this.meta;
    }

    getInputData (){
        return this.inputData;
    }

    setElTargetByID(targetId) {
        this.#target= targetId;
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
        this.callback().then(this.renderView());
    }
    
    callback() {
        throw new Error('not implemented')
    }
    renderView() {
      throw new Error('not implemented here');
    }
    // Memento Pattern for Progressive Web Apps
    createMemento()  {
        let memento = createMemento(this);
        let innerControllerStatus = this.getBindingModel();
        memento.setMementoState(this,innerControllerStatus);
        return memento;
    }

    installMemento(memento) {
        let innerControllerStatus = memento.getMementoState(this);
        this.setBindingModel(innerControllerStatus);
    }
}