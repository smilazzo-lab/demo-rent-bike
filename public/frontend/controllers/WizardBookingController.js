import AbstractWizardStep from "../../step-fmw/stepping/AbstractWizardStep.js";
import CacheDizionari from "../dictionaries/CacheDizionari.js";
import BookingCustomerInfoValidator from "../validators/BookingCustomerInfoValidator.js";

export default class WizardBookingController extends AbstractWizardStep {

  validator = new BookingCustomerInfoValidator();

  $_model = {
    // 1 maschera
    $_0___booking: {
      id: 'xxxx-xxxx-xxxx-xxxx',
      from: null,
      to: null,
    },
    //2 maschera del wizard
    $_1___bikes: {
      listOfItems: [],
      from: null,
      to: null
    },
    // 3 maschera del wizard
    $_2___customerInfo: {
      firstname: null, surname: null, email: null, phoneNo: null,
      document: {
        number: '',
        type: '',
        scadenza: ''
      }
    }

  };

  constructor(routerRef, specificato, edit_mode) {
    super(routerRef, specificato, edit_mode);
  }

  getValidator() {
    if (super.getCurrentPhase() == 0) {
      return this.validator;
    }
    return null;
  }

  getElementOfCollection(index) {
    this.switchToPhase(1);
    return super.getBindingModel().listOfItems[index];
  }

  removeElementOfCollection(index) {
    this.switchToPhase(1);
    if (index > -1) {
      this.getBindingModel().listOfItems.splice(index, 1);
    }
    this.renderView();
  }

  initialize() {
    // niente
  }

  insertEntity() {
    console.log("insiede confemra entity");
    let info = { title: 'empty title', message: 'empty message' };
    super.getStepRouter().callStep("/booking/confirm", JSON.stringify(info));
  }

  renderView() {
   let templateName = 'booking-phase' + super.getCurrentPhase();
   let header = super.getCurrentPhase() === 1 ? ["type", "qty", "daily cost"] : {};
   let data;
    if (super.getCurrentPhase() === 1) {
      //data = this.model.bikes.listOfItems;
      data = this.getBindingModel().listOfItems;
    } else {
      data = {}
    }
    super.getWebUi().renderer({
      templateName: templateName,
      templateType: 'wizard',
      templateMetaInfo: super.getMetaInfo(),
      templateData: JSON.stringify({ header, data }),
      templateBindingZone: super.getBindingModel(),
      templateValidator: this.validator
    });
  }


  callback() {
    // ASSUMO DIRETTAMENTE LA LOOKUP RITORNARE ALLA PHASE 1
    super.switchToPhase(1);
    let callbackData = super.getInputData();
    this.getBindingModel().listOfItems.push(callbackData);
  }



  avanti() {
     // se ci sono errori non si va avanti
    if (!this.validator.isValid()) {
      return;
    }

    if (this.getCurrentPhase() === 0) {
      // validazione delle data from > data To
      let from = Date.parse(super.getBindingModel().from.value);
      let to = Date.parse(super.getBindingModel().to.value);
      let limiteValiditaApp= new Date('01/01/2022').getTime();

      console.log("from="+from);
      console.log("to="+to);
      console.log("limiteValiditaApp="+limiteValiditaApp);
      let error = false;
      if (!(super.getBindingModel().from.value)) {
        super.getWebUi().setErrorMsg('from', 'La data è obbligatoria');
        error = true;
      }
      if (!(super.getBindingModel().to.value)) {
        super.getWebUi().setErrorMsg('to', 'La data è obbligatoria');
        error = true;
      }
      if (from >limiteValiditaApp) {
        super.getWebUi().setErrorMsg('from', 'La data iniziale non può superare il 31/12/2021');
        error = true;
      }

      if (to >limiteValiditaApp) {
        super.getWebUi().setErrorMsg('to', 'La data finale non può superare il 31/12/2021');
        error = true;
      }
      if (from > to) {
        super.getWebUi().setErrorMsg('to', 'La data finale non può essere inferiore alla data iniziale');
        error = true;
      }
      if (error) {
        return;
      }
      // copio i valori al model della fase successiva
     this.$_model.$_1___bikes.from = super.getBindingModel().from.value;
     this.$_model.$_1___bikes.to = super.getBindingModel().to.value;
      
    }

    if (this.getCurrentPhase() == 1){
        console.log(this.$_model.$_1___bikes.$_1___bikes);
      if ( ! this.$_model.$_1___bikes.$_1___bikes){
        console.log("SELEZIONARE UNA BICI")
        super.getWebUi().setErrorMsg('val-box', 'Selezionare una bici');
        return;
      }
    }
    super.avanti();
  }

}