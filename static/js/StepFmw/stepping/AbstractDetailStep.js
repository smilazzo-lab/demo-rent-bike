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
    
    constructor(routerRef,specificato,options) {
        super(routerRef,specificato,options);
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
        super.renderView();
       
    }

    conferma() {
       
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