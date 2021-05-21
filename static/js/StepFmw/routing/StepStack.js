export default class  {
    #interactionStack=[];

    constructor() {

    }
    
    getCurrentStep() {
        let indexUltimo = this.#interactionStack.length;
        if (indexUltimo>0){
            return this.#interactionStack[indexUltimo-1];
        }else{
            return null;
        }
    }

    reset(){
        this.#interactionStack = [];
    }

    push(step) {
        this.#interactionStack.push(step);
    }

    pop() {
        return this.#interactionStack.pop();
    }
    

}