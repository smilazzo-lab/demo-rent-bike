/**
 * @author smilazzo 
 * @date 2021
 * $tep framework
 */

import AbstractLookupStep from "../../../StepFmw/stepping/AbstractLookupStep.js";

export default class  extends AbstractLookupStep{
    
    #lookup;

    getCriteria() {
        return JSON.stringify(this.#lookup);
    }

    constructor(specificato,search_mode) {
        super(specificato,search_mode);
    }

    buildCriteria() {
        // carica nel proprio stato la struttura del criterio e della lista
       this.#lookup = JSON.parse(super.getInputData());
     }


    asyncSearch(criteria) {
        return fetch("https://api.thecatapi.com/v1/categories",  {
            method: 'GET', 
            headers: {          'Content-Type': 'application/json',
                                'x-api-key':'f7b94ad6-4924-4bea-9bd0-a126a7116e13'
                    }
          });
    }
    
   
    async asyncFetchHtmlTemplate() {
      return super.asyncFetchHtmlTemplateParam('http://localhost:3000/launcher/lookup/cat-phase0',this.getCriteria())
   }

}