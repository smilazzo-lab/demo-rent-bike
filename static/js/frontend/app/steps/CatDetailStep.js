import AbstractValidator from "../../../StepFmw/data-binding/AbstractValidator.js";
import AbstractDetailStep from "../../../StepFmw/stepping/AbstractDetailStep.js";
import CacheDizionari from "../dictionaries/CacheDizionari.js";
import CatWizardPhase0Validator from "../models/CatWizardPhase0Validator.js";

export default class  extends AbstractDetailStep{
    #cat;
    #titoloNotify = 'Messaggio di Sistema';
    #messaggioNotigy= 'Attenzione , dichiara di prendere visione di questa supercazzola';

    constructor(specificato,edit_mode) {
        super(specificato,edit_mode);
    }

    getValidator() {
      return new CatWizardPhase0Validator();
    }

    getBindingModel() {
      console.log("model photo : "+JSON.stringify(this.#cat));
      return this.#cat;
    }

    setBindingModel(state) {
      this.#cat=state;
     }
    // lifecycle 0
    initialize() {
      // nella initialize prendo solo INPUT DATA COME RIFERIMENTO
      let inputData = JSON.parse(this.getInputData());
      inputData.cmbProva = CacheDizionari.getDizionario('Prova');
      inputData.selectedCmbProva = null;
      this.setBindingModel(inputData);
     }
    //  fetch da DETAIL/CAT

    async asyncFetchHtmlTemplate() {
      console.log("asyncFetch BEfore cat="+JSON.stringify(this.#cat));
      return super.asyncFetchHtmlTemplateParam('http://localhost:3000/launcher/detail/cat',
        JSON.stringify({edit_mode: this.getEditMode(),cmbProva : this.#cat.cmbProva}));
    }

      insertEntity() {
        console.log("insiede confemra entity");
        let info = {title:this.#titoloNotify,message:this.#messaggioNotigy};
       // window.StepRouter.callStep("/cat/notify",JSON.stringify(info));
       window.StepRouter.callStep("/cat/confirm",JSON.stringify(info));
    }

    callback() {
      let callbackData = JSON.parse(this.getInputData());
      // se provengo dal confirm interaction
      if (callbackData['command']) {
        console.log("inputData = "+callbackData['command']);
        if (callbackData['command']==='yes') {
          console.log("yes rilevato");
          this.getBindingModel().width="YES CONFIRM";
        }
      }
      else if (callbackData['name']){  // se provengo dalla lookup
         console.log("callback called with" + callbackData.name);
         this.getBindingModel().width=callbackData.name;
        
      }
    }
}