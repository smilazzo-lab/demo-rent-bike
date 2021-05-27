import AbstractDetailStep from "../../../step-fmw/stepping/AbstractDetailStep.js";
import CacheDizionari from "../dictionaries/CacheDizionari.js";
import CatWizardPhase0Validator from "../validators/CatWizardPhase0Validator.js";

export default class  extends AbstractDetailStep{
    #cat;
    #titoloNotify = 'Messaggio di Sistema';
    #messaggioNotigy= 'Attenzione , dichiara di prendere visione di questa supercazzola';

    constructor(stepContext,specificato,edit_mode) {
        super(stepContext,specificato,edit_mode);
    }

    getValidator() {
      return new CatWizardPhase0Validator();
    }

    getBindingModel() {
       return this.#cat;
    }

    setBindingModel(state) {
      this.#cat=state;
     }
    // lifecycle 0
    initialize() {
      // nella initialize prendo solo INPUT DATA COME RIFERIMENTO
      let inputData = this.getInputData();
      inputData.cmbProva = CacheDizionari.getDizionario('Prova');
      inputData.selectedCmbProva = null;
      this.setBindingModel(inputData);
     }
    //  fetch da DETAIL/CAT

    async asyncFetchHtmlTemplate() {
      return super.asyncFetchHtmlTemplateParam('http://localhost:3000/launcher/detail/cat',
        JSON.stringify({edit_mode: this.getEditMode(),cmbProva : this.#cat.cmbProva}));
    }

      insertEntity() {
       let info = {title:this.#titoloNotify,message:this.#messaggioNotigy};
       super.getStepContext().callStep("/cat/confirm",info);
    }

    callback() {
      let callbackData = this.getInputData();
      // se provengo dal confirm interaction
      if (callbackData['command']) {
       
        if (callbackData['command']==='yes') {
         
          this.getBindingModel().width="YES CONFIRM";
        }
      }
      else if (callbackData['name']){  // se provengo dalla lookup
       
         this.getBindingModel().width=callbackData.name;
        
      }
    }
}