export  default class  {
    #mementoStack=[];

    constructor() {

    }

    reset() {
        this.#mementoStack=[];
    }
    push(mem) {
         this.#mementoStack.push(mem);
    }
    pop() {
        return this.#mementoStack.pop();
    }

    getCurrentMemento() {
        let indexUltimo = this.#mementoStack.length;
        if (indexUltimo>0){
            return this.#mementoStack[indexUltimo-1];
        }else{
            return null;
        } 
    }

}