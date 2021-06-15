/**
 * @author smilazzo 
 * @date 2021
 * $tep framework
 */
import AbstractLookupStep from "../../step-fmw/stepping/AbstractLookupStep.js";
import BookingServiceSingleton from "../use-cases/manifest.js";

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


     async asyncSearch(criteria) {
   /*
        item: {
            qty: 0,
            description: '',
            unityCost: 0,
            type: ''
            */
          
        return BookingServiceSingleton.getIstance()
                                       .queryProductServices();
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