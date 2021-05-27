import AbstractValidator from "../../step-fmw/data-binding/AbstractValidator.js";
/**
 * @author smilazzo
 * 
 */
export default class extends AbstractValidator {

    validateField(name,value) {
        console.log("concrete validator");
        console.log('sto validando name='+name +"con valore="+value );
        // validazione ID
        if (name==='cat-id') {
            if (!value) {
                    return 'errore: il campo id è obbligatorio';
            }
        }
        // validazione SELECT TIPOLOGIA
        if (name==='cat-select') {
            if (!value) {
                return 'selezionare almeno un elemento';
            }
            if (value ==='codice1') {
                return 'non è possibile selezionare questa voce per il caso d uso specificato';
            }
        }
     return null;
    }
}