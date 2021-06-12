/**
 * @author Salvatore Milazzo
 * @description StepLoader ,dinamically creates objects from string 
 *               declaration 
 * @date 2021
 * @name $tep MVC SPA framework
 * @license MIT
 */


export default class StepLoader {

    step_collection={};

    #injectedUi
    
    constructor({renderer,setErrorMsg}) {
      
        this.#injectedUi={renderer,setErrorMsg};
        console.log(this.#injectedUi);
    }

    
    use(className,step) {
        this.step_collection[className] = step;
    }

    instantiate(routerRef,className, args) {
       
         let S = this.step_collection[className]; 
         let obj= new S(this.#injectedUi,routerRef,args[0],args[1]);
       
         return obj;
   }
}