/**
 * @author smilazzo 
 * @date 2021
 * $tep framework
 */

import AbstractLookupStep from "../../step-fmw/stepping/AbstractLookupStep.js";

export default class  extends AbstractLookupStep{
    
    criteria;
    #listaCategorie=[];
    #header=['codice','descrizione'];
    
    constructor(stepContext,specificato,search_mode) {
        super(stepContext,specificato,search_mode);
    }
    getCriteria() {
        return this.criteria;
    }

    setCollection(lst) {
       this.#listaCategorie=lst;
     }

     pickElement(i){
         return this.#listaCategorie[i];
     }


    buildCriteria() {
        // carica nel proprio stato la struttura del criterio e della lista
       this.criteria = super.getInputData();
       
     }


    asyncSearch(criteria) {
        // qui non dipende dal criteria ma in generale è funzione del criteria
        return fetch("https://api.thecatapi.com/v1/categories",  {
            method: 'GET', 
            headers: {          'Content-Type': 'application/json',
                                'x-api-key':'f7b94ad6-4924-4bea-9bd0-a126a7116e13'
                    }
          });
    }
    
   
    async asyncFetchHtmlTemplate() {
      return super.asyncFetchHtmlTemplateParam(
          'http://localhost:3000/launcher/lookup/cat',
          JSON.stringify({
              criteria: this.criteria,
              header:this.#header,
              data:this.#listaCategorie
          }))
   }

}