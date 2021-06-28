import AbstractEditController from "step-fmw/stepping/AbstractDetailStep.js";

export default class  extends AbstractEditController{
   
    constructor(router,specificato,edit_mode) {
        super(router,specificato,edit_mode);
    }
    
   // lifecycle 0
    buildModel() {
          
     }
    

     getBindingModel(){
       return {};
     }
     
    async initialize() {
      return '';
    }


    //  fetch da DETAIL/CAT
    renderView() {
      
      super.getWebUi().renderer({
        templateType: 'detail',
        templateName: 'home',
        templateData: JSON.stringify({}),
        templateMetaInfo: super.getMetaInfo(),
        templateBindingZone:null});
        }

    

      async callback() {

      }
     
}