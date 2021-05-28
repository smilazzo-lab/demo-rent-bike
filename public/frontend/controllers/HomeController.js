import AbstractEditController from "../../step-fmw/stepping/AbstractDetailStep.js";

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
     
    initialize() {
      // niente
    }


    //  fetch da DETAIL/CAT
    renderView() {
      
      super.getUI().renderer({
        templateType: 'detail',
        templateName: 'home',
        templateData: JSON.stringify({}),
        templateMetaInfo: super.getMetaInfo(),
        templateBindingZone:null});
        }

    

      callback() {

      }
     
}