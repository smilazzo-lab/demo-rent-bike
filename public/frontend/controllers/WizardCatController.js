import AbstractWizardStep from "../../step-fmw/stepping/AbstractWizardStep.js";
import CacheDizionari from "../dictionaries/CacheDizionari.js";
import CatWizardPhase0Validator from "../validators/CatWizardPhase0Validator.js";

export default class  extends AbstractWizardStep{
   #sem = false;
  // Model per il Tab 1
    #cat_phase0 =  { // tipo gatto selezionato
                    selectedCmbProva:null, 
                    // elenco tipologie gatti 
                    cmbProva:[],
                    // dettaglio gatto 
                    id:'0',url:'url phase 0', width:'0',height:'0'};
    // Tab 2
    #cat_phase1 = { id:'1',url:'url phase 1', width:'1', height:'1'};
    // Tab3
    #cat_phase2 = { id:'2',url:'url phase 2', width:'2', height:'2'};
   
    #titoloNotify = 'Messaggio di Sistema';
    #messaggioNotigy= 'Attenzione , dichiara di prendere visione di questa supercazzola';

    #validatorPhase0 =new CatWizardPhase0Validator();
    
    constructor(routerRef,specificato,edit_mode) {
        super(routerRef,specificato,edit_mode);
    }
    getValidator() {
        if (super.getCurrentPhase()==0) {
            return this.#validatorPhase0;
        }
        return null;
    }

    getBindingModel() {
      console.log("model photo : "+JSON.stringify(this.#cat_phase0));
      switch(super.getCurrentPhase()) {
        case 0 : return this.#cat_phase0;
        case 1 : return this.#cat_phase1;
        case 2 : return this.#cat_phase2;
        default: throw new Error('only 3 phases');
      }
      return this.#cat_phase0;
    }

    // lifecycle 0
    initialize() {
      // preparazione dei dizionari (SINCRONA)
      this.#cat_phase0.cmbProva = CacheDizionari.getDizionario('Prova');
    } 
       
    //  fetch da DETAIL/CAT
  
    async asyncFetchHtmlTemplate() {
      console.log("dender :"+this.#cat_phase0.cmbProva);
      
      return super.asyncFetchHtmlTemplateParam(
        'http://localhost:3000/launcher/wizard/cat-phase'+this.getCurrentPhase(),
        JSON.stringify({edit_mode: this.getEditMode(),
                        phase_no : this.getCurrentPhase(),
                        cmbProva : this.#cat_phase0.cmbProva}));
    
        }

      insertEntity() {
        console.log("insiede confemra entity");
        let info = {title:this.#titoloNotify,message:this.#messaggioNotigy};
        super.getStepRouter().callStep("/cat/confirm",JSON.stringify(info));
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