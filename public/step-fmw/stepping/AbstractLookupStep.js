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
        super._initialize(c,m);
     }

     setCollection(lst) {
        throw new Error('not implemented');
     }

     pickElement(i){
        throw new Error('not implemented');
     }
     
     
  // da pulsante
    async doLookupSearch(criteria) {
        return this.asyncSearch(criteria)
         .then(data => {this.setCollection(data)
                         return '';
                        }
              );
       
       
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