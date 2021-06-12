/**
 * @author Salvatore Milazzo
 * @description AbstractValidator 
 *               map {
                 name : [],
                 confermapwd : ['password corta','password diversa dalla precedente'],
                 }
 * @date 2021
 * @name $tep MVC SPA framework
 * @license MIT
 */

export default class AbstractValidator {

        #map = new Map();
       
    
    _validate(tagElement, value) {
        let elementName = tagElement.getAttribute('id');
        
        if (!elementName) return;

        let error= this.validateField(elementName,value);

        if (error) {
           
            this.setErrorFor(tagElement,error);
        }

        if (!error) {
           
            this.setSuccessFor(tagElement);
        }
        this.#map.set(elementName, error);
        
    }

    validateField(name,value) {
        return null;
    }

    isValid() {
      let mapIter = this.#map.values()
      let count=0;
      while (mapIter.next().value) {
        count++;
      }
      return count===0;
    }


    setErrorFor(input, message) {
      const formControl = input.parentElement;
      const small = formControl.querySelector('small');
      formControl.className = 'form-control error';
      small.innerText = message;
    }
    
    setSuccessFor(input) {
      const formControl = input.parentElement;
      formControl.className = 'form-control success';
    }
}