/**
 * @author smilazzo 
 * @date 2021
 *  AbstractDetailStep 
 *  methods : constructor(target,edit_mode)
 *          : initialize  pipeline di initialize
 *          : conferma {inserimento, modifica, cancella}
 * 
 *  richiede override di:  buildModel
 *                                  
 */

import AbstractStep from "./AbstractStep.js";

export default class extends AbstractStep{
    // il target html dove renderizzare la classe
    #target='';
    #inputData ={};
    #phaseNo =0;
   
    constructor(routerRef,specificato,options) {
        super(routerRef,specificato,options);
    }

    getCurrentPhase() {
        return this.#phaseNo;
    }

    getBindingModel() {
        return super.getBindingModel();
    }

    setBindingModel(memento) {
        super.setBindingModel(memento);
    }
    switchToPhase(phaseNo){
      this.#phaseNo=phaseNo;
    }

   
    avanti() {
      
        this.#phaseNo++;
        this.switchToPhase(this.#phaseNo);
        this.renderView();
    }

    indietro() {
        if (this.#phaseNo>0){ 
            this.#phaseNo--;
        }
        this.switchToPhase(this.#phaseNo);
        this.renderView();
    }
    
   
  
 
    initialize() {
        throw new Error('not implemented in AbstractDetailStep');
    }

    // pipeline di template 
    _initialize(c,m) {
        // Clonare gli oggetti interrompere il riferimento diretto
        let metaInfo= JSON.parse(JSON.stringify(m));
        let inputData=JSON.parse(JSON.stringify(c));

        super.setInputData(inputData);
        super.setMetaInfo(metaInfo);

        this.initialize();
        this.renderView();
       
    }

    conferma() {
        console.log("inside conferma");
        console.log("edit_mode="+super.getEditMode());

       if(super.getEditMode()==='vis'){
        this.insertEntity();
       }
       if (super.getEditMode()==='ins'){
           this.insertEntity();
       }
       if (super.getEditMode()==='upd') {
           this.updateEntity();
       }
       if (super.getEditMode()==='del') {
           this.cancelEntity();
       }
    }

    insertEntity() {
        throw new Error('insertEntity() is an abstract!');
    }

    updateEntity() {
        throw new Error('updateEntity() is an abstract!');
    }

    cancelEntity() {
        throw new Error('cancelEntity() is an abstract!');
    }
   
}