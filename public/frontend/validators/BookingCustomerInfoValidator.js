import AbstractValidator from "../../step-fmw/data-binding/AbstractValidator.js";
/**
 * @author smilazzo
 * 
 */
export default class extends AbstractValidator {

    validateField(name,value) {
       // validazione 1 tab

       if (name==='id') {
         if (!value) {
           return 'errore: il campo UUID è obbligatorio';
         }
       }

       if (name==='from') {
         if (!value) {
           return 'errore: il campo Dal è obbligatorio';
         }
         else {
           let dataOdierna = Date.now();
           let from= Date.parse(value);
         
           if (from<=dataOdierna) {
             return 'errore: non è possibile selezionare una data anteriore la data odierna.';
           }
         }
       }

       if (name==='to') {
        if (!value) {
          return 'errore: il campo To è obbligatorio';
        }{
          let dataOdierna = Date.now();
          let toParsed= Date.parse(value);
        
          if (toParsed<=dataOdierna) {
            return 'errore: non è possibile selezionare una data anteriore la data odierna.';
          }else{
            
          }
          
        }
      }

        // validazione name
        if (name==='firstname') {
            if (!value) {
                    return 'errore: il campo Nome è obbligatoio';
            }
        }
        if (name==='surname') {
            if (!value) {
                    return 'errore: il campo Cognome è obbligatoio';
            }
        }

        if (name==='email') {
            if (!value) {
                    return 'errore: il campo Email è obbligatoio';
            }else {
                if (!this.validateEmail(value)) {
                    return 'errore: L email inserita non è valida';
                }
            }
        }

        if (name==='phoneNo') {
            if (!value) {
                    return 'errore: il campo Tel. è obbligatoio';
            }else {
                if (!this.validatePhoneNo(value)) {
                    return 'errore: il campo Tel. non è valido';
                }
            }
        }
    }

     validateEmail(email) {
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email.match(mailformat)) {
          return true;
        }
        else {
          return false;
        }
      }
    
    
     validateName(name) {
      var nameformat = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
      if (name.match(nameformat)) {
        return true;
      }
      else {
        return false;
      }
    }
    
     validatePhoneNo(number) {
      var telformat = /^\d{10}$/;
      if (number.match(telformat)) {
        return true;
      }
      else {
        return false;
      }
    }
}