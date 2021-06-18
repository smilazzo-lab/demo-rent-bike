/**
 * @author smilazzo 
 * @date 2021
 * $tep framework
 */
import AbstractLookupStep from "../../step-fmw/stepping/AbstractLookupStep.js";
import BookingBikeServices from "../use-cases/manifest.js";

export default class  extends AbstractLookupStep{
    
    criteria={};
    $_model ={
        $_0___items: { listOfProducts : []     }
    };
    #header=['type','description','unityCost','qty','picture_uri',"des_price_strategy"];
    
    constructor(stepContext,specificato,search_mode) {
        
        super(stepContext,specificato,search_mode);
    }

    async initialize(){

        // shortcut perchè sull'inizio della interazione
        // gia voglio l elenco dei tipi di bici
        return super.doLookupSearch(this.criteria)
        .then(data => {this.setCollection(data)
        return '';});
        //.then(this.renderView());
    }

       
    
    getCriteria() {
        return this.criteria;
    }

    setCollection(lst) {
       this.$_model.$_0___items.listOfProducts=lst;
   
    }
      

     pickElement(i){
        console.log("***************************************");
        console.log(JSON.stringify(this.$_model.$_0___items.listOfProducts[i]));
        console.log("***************************************");
       return this.$_model.$_0___items.listOfProducts[i];
     }


   
     async asyncSearch(criteria) {
        return await BookingBikeServices.getIstance()
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