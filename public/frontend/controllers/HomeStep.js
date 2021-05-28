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
      
      super.getUI()({
        templateUrl: 'http://localhost:3000/launcher/detail/home',
        templateData: JSON.stringify({}),
        metaInfo: super.getMetaInfo(),
        uimodel:null});
         }

    

      callback() {

      }
     
}