/**
 * @author Salvatore Milazzo
 * @description StepLoader ,dinamically creates objects from string 
 *               declaration 
 * @date 2021
 * @name $tep MVC SPA framework
 * @license MIT
 */

import AbstractStep from '../stepping/AbstractStep.js';

export default class  {

    step_collection={};

    constructor() {

    }

    use(className,step) {
        this.step_collection[className] = step;
    }

    instantiate(className, args) {
         let S = this.step_collection[className]; 
         return new S(args[0],args[1])
   }
}