/**
 * @author smilazzo 
 * @date 2021
 * $tep framework
 */

import AbstractLookupStep from "../../step-fmw/stepping/AbstractLookupStep.js";

export default class  extends AbstractLookupStep{
    
    criteria={};
    $_model ={
        $_0___items: { elencoTipologieBici : []     }
    };
    #header=['type','description','unityCost','qty'];

    
     /*
        item: {
            qty: 0,
            description: '',
            unityCost: 0,
            type: ''
            */
    
    constructor(stepContext,specificato,search_mode) {
        
        super(stepContext,specificato,search_mode);
        // shortcut perchè sull'inizio della interazione
        // gia voglio l elenco dei tipi di bici
        super.doLookupSearch(this.criteria);
    }
    getCriteria() {
        return this.criteria;
    }

    setCollection(lst) {
      this.$_model.$_0___items.elencoTipologieBici=lst;
    }
      

     pickElement(i){
         return super.getBindingModel().elencoTipologieBici[i];
     }


    buildCriteria() {
        // carica nel proprio stato la struttura del criterio e della lista
       this.criteria = super.getInputData();
       
     }


     asyncSearch(criteria) {
   /*
        item: {
            qty: 0,
            description: '',
            unityCost: 0,
            type: ''
            */
          
        let ret =  [
            {type:'CB1',description:'City Bike 1',unityCost :'1',quantity:1},
            {type:'CB2',description:'City Bike 2',unityCost :'2',quantity:1},
            {type:'CB3',description:'City Bike 3',unityCost :'3',quantity:1},
            {type:'CB4',description:'City Bike 4',unityCost :'4',quantity:1},
            {type:'CB5',description:'City Bike 5',unityCost :'5',quantity:1},
            {type:'CB6',description:'City Bike 6',unityCost :'6',quantity:1},
            {type:'CB7',description:'City Bike 7',unityCost :'7',quantity:1},
            {type:'CB8',description:'City Bike 8',unityCost :'8',quantity:1},
                  ];
      
        return ret;
    }
    
   
      renderView() {

        super.getWebUi().renderer({
            templateType:'lookup',
            templateName:'items',
            templateData:  JSON.stringify({
                criteria: this.criteria,
                header:this.#header,
                data: super.getBindingModel().elencoTipologieBici
            }),
            templateMetaInfo:super.getMetaInfo(),
            templateBindingZone:super.getBindingModel()});
        }

   

}