/**
 * @author smilazzo 
 * @date 2021
 * $tep framework
 */
import postUCs from '../use-cases/manifest.js';
import AbstractCollectionStep from "../../step-fmw/stepping/AbstractCollectionStep.js";

export default class  extends AbstractCollectionStep{
    #cats = [];
    #header=['id','url','width','height'];
    

    #apiCommandListaGattiUrl='https://api.thecatapi.com/v1/images/search?limit=4&page=1&order=Desc';
  
    constructor(stepContext,specificato,search_mode) {
        super(stepContext,specificato,search_mode);
    }

    getElementOfCollection(index) {
        console.log("sto inviando indietro al contoller elemento:"+this.#cats[index]);
        return this.#cats[index];
    }

    asyncSearch(criteria) {
      //  postUCs.listAllPostsUC();
      
        return fetch(this.#apiCommandListaGattiUrl,  {
              method: 'GET', 
              headers: {          'Content-Type': 'application/json',
                                  'x-api-key':'f7b94ad6-4924-4bea-9bd0-a126a7116e13'
                      }
            });
    }

    getBindingModel() {
       return this.#cats;
      
    }

    setBindingModel(state) {
     this.#cats = state;
    }
    
    // lifecycle 0
    initialize() {
            console.log("INSIDE INITIALIZE DI CAT CONTROLLER");
             let inputData = super.getInputData();
             this.setBindingModel(inputData);
            
     }

     callback() {

     }
    
    async asyncFetchHtmlTemplate() {
        console.log("FETCH ="+JSON.stringify({header:this.#header,data:this.#cats}));
        return super.asyncFetchHtmlTemplateParam(
            'http://localhost:3000/launcher/collection/cats',
            JSON.stringify({header:this.#header,data:this.#cats}));
        }

}