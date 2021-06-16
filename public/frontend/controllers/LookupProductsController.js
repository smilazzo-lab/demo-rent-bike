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
        $_0___items: { listOfProducts : []     }
    };
    #header=['type','description','unityCost','qty','picture_uri'];
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
        super.doLookupSearch(this.criteria)
        .then(data => this.setCollection(data));
        //.then(this.renderView());
        }
       
    
    getCriteria() {
        return this.criteria;
    }

    setCollection(lst) {
        console.log("set Collection = "+JSON.stringify(lst));
      this.$_model.$_0___items.listOfProducts=lst;
      console.log("set Collection = "+JSON.stringify(this.$_model.$_0___items.listOfProducts));
      this.renderView();
    }
      

     pickElement(i){
         return super.getBindingModel().listOfProducts[i];
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
          
        return await BookingServiceSingleton.getIstance()
                                       .queryProductServices();
    }
    
   
      renderView() {
        console.log("render = "+JSON.stringify( this.$_model.$_0___items.listOfProducts));
        super.getWebUi().renderer({
            templateType:'lookup',
            templateName:'products',
            templateData:  JSON.stringify({
                criteria: this.criteria,
                header:this.#header,
                data:  this.$_model.$_0___items.listOfProducts
            }),
            templateMetaInfo:super.getMetaInfo(),
            templateBindingZone:super.getBindingModel()});
        }
}