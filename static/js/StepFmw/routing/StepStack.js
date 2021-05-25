/**
 * @author salvo Milazzo
 * @description general purpose stack
 */
export default class  {
    #stk=[];


    constructor() {

    }
    
    getCurrent() {
        let indexUltimo = this.#stk.length;
        if (indexUltimo>0){
            return this. #stk[indexUltimo-1];
        }else{
            return null;
        }
    }

    reset(){
        this.#stk = [];
    }

    push(step) {
        this. #stk.push(step);
    }

    pop() {
        return this.#stk.pop();
    }
    

}