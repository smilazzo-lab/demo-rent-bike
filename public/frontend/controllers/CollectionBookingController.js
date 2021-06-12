/**
 * @author smilazzo 
 * @date 2021
 * $tep framework
 */

import AbstractCollectionStep from "../../step-fmw/stepping/AbstractCollectionStep.js";

export default class  extends AbstractCollectionStep{
    #bookings = [];
    #header=['uuid','surname','total','total'];
    

    #apiCommandListaGattiUrl='https://api.thecatapi.com/v1/images/search?limit=4&page=1&order=Desc';
  
    constructor(stepContext,specificato,search_mode) {
        super(stepContext,specificato,search_mode);
    }

    getElementOfCollection(index) {
        return this.#bookings[index];
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
       return this.#bookings;
      
    }

    setBindingModel(state) {
     this.#bookings = state;
    }
    
    // lifecycle 0
    initialize() {
            console.log("INSIDE INITIALIZE DI CAT CONTROLLER");
             let inputData = super.getInputData();
             this.setBindingModel(inputData);
            
     }

     callback() {

     }
    
     renderView() {
        super.getWebUi().renderer({
            templateName:'bookings',
            templateType:'collection',
            templateData: JSON.stringify({header:this.#header,data:this.#bookings}),
            templateMetaInfo: super.getMetaInfo(),
            templateBindingZone:null});
             }
        

}