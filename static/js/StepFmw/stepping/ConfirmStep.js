import AbstractDetailStep from "./AbstractDetailStep.js";

export default class  extends AbstractDetailStep{
    
    #entity = '';
    #message = {};

    constructor(specificato,options) {
        super(specificato,options);
        this.#entity=options;
    }

    // lifecycle 0
    initialize() {
        this.#message = JSON.parse(this.getInputData());
     }
    
     //  fetch da DETAIL/CAT
  
    async asyncFetchHtmlTemplate() {
      
      return super.asyncFetchHtmlTemplateParam(
        'http://localhost:3000/launcher/confirm/'+this.#entity,
        JSON.stringify(this.#message));
      }

     

}