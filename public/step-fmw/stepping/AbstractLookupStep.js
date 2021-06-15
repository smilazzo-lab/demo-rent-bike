/**
 * @author smilazzo 
 * @date 2021
 * $tep framework
 */
import AbstractDetailStep from './AbstractDetailStep.js'

export default class extends AbstractDetailStep {

    // criteria
    // lista

    constructor(routerRef,specificato,options) {
           super(routerRef,specificato,options);
    }

    getCriteria() {
        throw new Error('abstract!');
    }
    
    buildCriteria() {
        throw new Error('buildCriteria not implemented!')
    }
   
    _initialize(c,m) {
        // get rid of this.. not used in search mode
        super.setInputData(null);
        super.setMetaInfo(m);
        this.buildCriteria();
        this.renderView();
     }

     setCollection(lst) {
        throw new Error('not implemented');
     }

     pickElement(i){
        throw new Error('not implemented');
     }
     
     
  // da pulsante
    doLookupSearch(criteria) {
        let data = this.asyncSearch({})
       
         
         .then(data => {
            
            this.setCollection(data);
            this.renderView()
        })
        ;
    }

    async asyncSearch(criteria) {
        throw new Error('asyncSearch not implemented!')
    }

    getBindingModel() {
        return super.getBindingModel();
    }

    setBindingModel(model) {
        super.setBindingModel(model);
    }

    
}