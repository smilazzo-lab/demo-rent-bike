/**
 * @author Salvatore Milazzo
 * @description Observable , A very simple wrapper for Step Models used 
 *              for 2way binding beetween controller and view
 * @date 2021
 * @name $tep MVC SPA framework
 * @license MIT
 */

export default class Observable {

constructor(value) {
    this._listeners = [];
    this._value = value;
   }

  notify() {
    this._listeners.forEach(listener => listener(this._value));
  }

  subscribe(listener) {
    this._listeners.push(listener);
  }

  get value() {
    return this._value;
  }

  set value(val) {
    if (val !== this._value) {
      this._value = val;
      this.notify();
    }
  }

  bindToHtmlElement(input,validator) {
    input.value = this._value;
    this.subscribe(() => input.value = this._value);
    input.onkeyup = () => {
      validator._validate(input,input.value) ;
      this._value = input.value;
    }
    input.onchange = () => {
      validator._validate(input,input.value) ;
      this._value = input.value;
    }
}


}
