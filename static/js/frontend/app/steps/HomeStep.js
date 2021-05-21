import AbstractEditController from "../../../StepFmw/stepping/AbstractDetailStep.js";

export default class  extends AbstractEditController{
   
    constructor(specificato,edit_mode) {
      console.log("Inside Home Step Contructor!");
      console.log("specificato = "+specificato);
      console.log("edit-mode="+edit_mode);
        super(specificato,edit_mode);
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