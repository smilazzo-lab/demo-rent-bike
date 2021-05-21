export class Computed extends Observable {
    constructor(value, deps) {
      super(value());
      const listener = () => {
        this._value = value();
        this.notify();
      }
      deps.forEach(dep => dep.subscribe(listener));
    }
  
    get value() {
      return this._value;
    }
  
    set value(_) {
      throw "Cannot set computed property";
    }
  }