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

export default class extends AbstractStep {
    // il target html dove renderizzare la classe
    #target='';
    #inputData ={};
    
   
    constructor(routerRef,specificato,options) {
        super(routerRef,specificato,options);
    }
 
    initialize() {
        throw new Error('not implemented in AbstractDetailStep');
    }

    // pipeline di template 
    _initialize(c,m) {
        super.setInputData(c);
        super.setMetaInfo(m);
        this.initialize();
        super.renderView();
       
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