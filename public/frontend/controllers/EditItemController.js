import AbstractDetailStep from "step-fmw/stepping/AbstractDetailStep.js";
import CacheDizionari from "../services/CacheDizionari.js";
import BookingCustomerInfoValidator from "../validators/BookingCustomerInfoValidator.js";

export default class EditItemController  extends AbstractDetailStep{
    
    $_model =  {
      $_0___item :{
      }
    };
    
   
    cmbQty = [];
    
    _titoloNotify = 'Messaggio di Sistema';
    _messaggioNotigy= 'Attenzione , dichiara di prendere visione di questa supercazzola';

    constructor(stepContext,specificato,edit_mode) {
        super(stepContext,specificato,edit_mode);
    }

   
    
    // lifecycle 0
    async initialize() {
      // nella initialize prendo solo INPUT DATA COME RIFERIMENTO
      let inputData = this.getInputData();
     
     console.log( JSON.stringify("INPUT DAT = "+JSON.stringify(inputData)));



      let modelRef ;

       modelRef=inputData;
     // modelRef=inputData;
     
      modelRef.quantity = inputData.quantity;
      modelRef.type=inputData.type;
      modelRef.description= inputData.description;
      modelRef.unityCost = inputData.unityCost;
      modelRef.picture_uri =inputData.picture_uri;

      this.$_model.$_0___item=modelRef;
      
      console.log("modelRef="+JSON.stringify(this.$_model));
      // inizializzazione non parametrica (fissa)
      this.cmbQty= CacheDizionari.getDizionario('Qty');
      
     
    }
    //  fetch da DETAIL/CAT

     renderView() {
       super.getWebUi().renderer({
        templateName:'item',
        templateType:'detail',
        templateMetaInfo:super.getMetaInfo(),
        templateData: JSON.stringify({cmbQty : this.cmbQty, picture_uri:this.getBindingModel().picture_uri}),
        templateBindingZone: super.getBindingModel(),
        templateValidator: new BookingCustomerInfoValidator()
       });
         }

      insertEntity() {
       console.log("IL MODEL ITEM ="+JSON.stringify(this.$_model));
       super.getStepContext().returnStep("/booking/wizard",'/booking/wizard/edit-item',this.$_model.$_0___item);
    }

   async   callback() {

}
}