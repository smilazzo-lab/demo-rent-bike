import AbstractWizardStep from "step-fmw/stepping/AbstractWizardStep.js";
import BookingCustomerInfoValidator from "../validators/BookingCustomerInfoValidator.js";
import BookingBikesDomain from "../domain/manifest.js";
import BookingService from '../services/manifest.js';

export default class WizardBookingController extends AbstractWizardStep {

  validator = new BookingCustomerInfoValidator();

  $_model = {
    // 1 maschera
    $_0___booking: {
      id: null,
      from: null,
      to: null,
    },
    //2 maschera del wizard
    $_1___bikes: {
      listOfItems: [],
      from: null,
      to: null,
      totalPrice: 0
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
      this.$_model.$_1___bikes.totalPrice = BookingBikesDomain.getIstance().removeItemToCurrentBooking(index);
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
    let header = super.getCurrentPhase() === 1 ? ["type", "qty", "daily cost", "img"] : {};
    let data;
    if (super.getCurrentPhase() === 1) {
      //data = this.model.bikes.listOfItems;
      data = this.getBindingModel().listOfItems.map(x => {
        return { type: x.description, qty: x.quantity, qty: x.quantity, picture_uri: x.picture_uri }
      });
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



  async callback({ fromStep, inputData }) {
    super.switchToPhase(1);
  
    if (fromStep === '/booking/wizard/edit-item') {
       if (!inputData.type) {
        return;
      }
      let idx = 0;
      this.getBindingModel().listOfItems.forEach(x => {
        if (x.id == inputData.id) {
          x.quantity = inputData.quantity.value;
          return;
        }
        idx++;
      });
      let idProduct= inputData.id;

      BookingBikesDomain.getIstance().removeItemToCurrentBooking(idx);
      
     return BookingService.getIstance()
                    .queryServiceById(idProduct)
                    .then(productTo=> this.$_model.$_1___bikes.totalPrice= BookingBikesDomain
                                                                            .getIstance()
                                                                            .addItemToCurrentBooking(productTo, inputData.quantity.value )
       );
      
    }

    else if (fromStep==='/booking/wizard/lookup-products') {
      this.getBindingModel().listOfItems.push(inputData);

      let from = this.$_model.$_0___booking.from;
      let to = this.$_model.$_0___booking.to;
      let idProduct = inputData.id;
      
      let qty = inputData.quantity.value;
      this.$_model.$_0___booking.id = BookingBikesDomain.getIstance().createIfNotExist({ from, to });

     return BookingService.getIstance()
                    .queryServiceById(idProduct)
                    .then(productTo=>  this.$_model.$_1___bikes.totalPrice= 
                                      BookingBikesDomain
                                      .getIstance()
                                      .addItemToCurrentBooking(productTo, qty )
       );
    }
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
      let limiteValiditaApp = new Date('01/01/2022').getTime();

      console.log("from=" + from);
      console.log("to=" + to);
      console.log("limiteValiditaApp=" + limiteValiditaApp);
      let error = false;
      if (!(super.getBindingModel().from.value)) {
        super.getWebUi().setErrorMsg('from', 'La data ?? obbligatoria');
        error = true;
      }
      if (!(super.getBindingModel().to.value)) {
        super.getWebUi().setErrorMsg('to', 'La data ?? obbligatoria');
        error = true;
      }
      if (from > limiteValiditaApp) {
        super.getWebUi().setErrorMsg('from', 'La data iniziale non pu?? superare il 31/12/2021');
        error = true;
      }

      if (to > limiteValiditaApp) {
        super.getWebUi().setErrorMsg('to', 'La data finale non pu?? superare il 31/12/2021');
        error = true;
      }
      if (from > to) {
        super.getWebUi().setErrorMsg('to', 'La data finale non pu?? essere inferiore alla data iniziale');
        error = true;
      }
      if (error) {
        return;
      }
      // copio i valori al model della fase successiva
      this.$_model.$_1___bikes.from = super.getBindingModel().from.value;
      this.$_model.$_1___bikes.to = super.getBindingModel().to.value;

    }

    if (this.getCurrentPhase() == 1) {
      console.log(this.$_model.$_1___bikes.$_1___bikes);
      if (!this.$_model.$_1___bikes.$_1___bikes) {
        console.log("SELEZIONARE UNA BICI")
        super.getWebUi().setErrorMsg('val-box', 'Selezionare una bici');
        return;
      }
    }
    super.avanti();
  }

}