/**
 * @author smilazzo 
 * @date 2021
 * $tep framework
 */
import AbstractLookupStep from "../../step-fmw/stepping/AbstractLookupStep.js";

import BookingCustomerInfoValidator from "../validators/BookingCustomerInfoValidator.js";
import BookingService from "../services/manifest.js";

export default class  extends AbstractLookupStep{

    emptyValidator = new BookingCustomerInfoValidator();
    
  
    $_model ={
        $_0___items: {
             listOfProducts : []   ,
             cmbListOfCategories:[],
             selectedIdCategory:-1,
           //  flgOrdirePrezzoCrescente,
             cmbListOfPriceRedux:[],
             selectedIdPriceRedux:-1 ,
             flgOrderByPrice:false
             }
    };
    #header=['type','description','unityCost','qty','picture_uri',"des_price_strategy"];
    
    constructor(stepContext,specificato,search_mode) {
        
        super(stepContext,specificato,search_mode);
    }

    async initialize(){

        this.$_model.$_0___items.cmbListOfCategories = await BookingService.getIstance().queryAllCategories();
        this.$_model.$_0___items.cmbListOfCategories.push({codice: -1,descrizione:'Tutte le categorie'});
        this.$_model.$_0___items.cmbListOfPriceRedux = await BookingService.getIstance().queryAllPriceStrategies();
        this.$_model.$_0___items.cmbListOfPriceRedux.push({codice: -1,descrizione:'Tutte le promozioni'});
        return super.doLookupSearch({});
      
    }

       
    
    getCriteria() {
        let criteria = {
            selectedIdCategory :   this.$_model.$_0___items.selectedIdCategory,
            selectedIdPriceRedux: this.$_model.$_0___items.selectedIdPriceRedux
        }
       return criteria;
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
        console.log("***************************************");
         console.log("CRITERIA = "+JSON.stringify(criteria));
         console.log("***************************************");
        return await BookingService.getIstance()
                                       .queryAllProducts(criteria);
    }
    
   
      renderView() {
          
        console.log("render = "+JSON.stringify( this.$_model.$_0___items.listOfProducts));
        super.getWebUi().renderer({
            templateType:'lookup',
            templateName:'products',
            templateData:  JSON.stringify({
                criteria: this.criteria,
                header:this.#header,
                data:  {
                            listOfProducts :this.$_model.$_0___items.listOfProducts,
                            cmbListOfCategories:this.$_model.$_0___items.cmbListOfCategories,
                            cmbListOfPriceRedux:this.$_model.$_0___items.cmbListOfPriceRedux
                        }
            }),
            templateMetaInfo:super.getMetaInfo(),
            templateBindingZone:super.getBindingModel(),
            templateValidator: this.emptyValidator
        });
        }
}