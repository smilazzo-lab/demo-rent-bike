import AbstractEditController from "../../../StepFmw/stepping/AbstractDetailStep.js";

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
  
    async asyncFetchHtmlTemplate() {
      return super.asyncFetchHtmlTemplateParam(
        'http://localhost:3000/launcher/detail/home',JSON.stringify({}));
      }
}