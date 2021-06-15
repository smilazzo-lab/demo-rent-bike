import AbstractDetailStep from "../../step-fmw/stepping/AbstractDetailStep.js";
import CacheDizionari from "../dictionaries/CacheDizionari.js";

export default class EditItemController  extends AbstractDetailStep{
    
    $_model =  {
      $_0___item :{
                   
                    unityCost: 0,
                    type: 'CB',
                    description:'des',
                    selectedCmbQty : null,
                    
      }
    };

    cmbQty = [];
    
    #titoloNotify = 'Messaggio di Sistema';
    #messaggioNotigy= 'Attenzione , dichiara di prendere visione di questa supercazzola';

    constructor(stepContext,specificato,edit_mode) {
        super(stepContext,specificato,edit_mode);
    }

   

    // lifecycle 0
    initialize() {
      // nella initialize prendo solo INPUT DATA COME RIFERIMENTO
      let inputData = this.getInputData();
     
     console.log( JSON.stringify("INPUT DAT = "+JSON.stringify(inputData)));



      let modelRef =  this.getBindingModel();
     
      modelRef.selectedCmbQty = inputData.quantity;
      modelRef.type=inputData.type;
      modelRef.description= inputData.description;
      modelRef.unityCost = inputData.unityCost;
      // inizializzazione non parametrica (fissa)
      this.cmbQty= CacheDizionari.getDizionario('Qty');
      
     
    }
    //  fetch da DETAIL/CAT

     renderView() {
       super.getWebUi().renderer({
        templateName:'item',
        templateType:'detail',
        templateMetaInfo:super.getMetaInfo(),
        templateData: JSON.stringify({cmbQty : this.cmbQty}),
        templateBindingZone: super.getBindingModel(),
        templateValidator: null
       });
         }

      insertEntity() {
       let info = {title:this.#titoloNotify,message:this.#messaggioNotigy};
       super.getStepContext().callStep("/cat/confirm",info);
    }

    callback() {

}
}