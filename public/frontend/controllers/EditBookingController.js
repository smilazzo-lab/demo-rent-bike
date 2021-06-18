import AbstractDetailStep from "../../step-fmw/stepping/AbstractDetailStep.js";

export default class  extends AbstractDetailStep{
  //{"id":4,"booking_uuid":"1111-1111-1111-1111","surname":"milazzo","name":"salvatore","date_ini":"2021-06-01T10:00:00.000Z","date_fin":"2021-06-01T10:00:00.000Z"}
   $_model = {
     $_0___booking : {
       booking_uuid:null
       ,surname:null
       ,name:null
       ,date_ini:null
       ,date_from:null
     }
   }

    constructor(stepContext,specificato,edit_mode) {
        super(stepContext,specificato,edit_mode);
    

    }
    
    // lifecycle 0
    async initialize() {
      // nella initialize prendo solo INPUT DATA COME RIFERIMENTO
      let inputData = this.getInputData();
      this.$_model.$_0___booking=inputData;
      return '';
    }
      
    

     renderView() {
       super.getWebUi().renderer({
        templateName:'booking',
        templateType:'detail',
        templateMetaInfo:super.getMetaInfo(),
        templateData: JSON.stringify({}),
        templateBindingZone: this.$_model.$_0___booking,
        templateValidator: null
       });
         }

    
}