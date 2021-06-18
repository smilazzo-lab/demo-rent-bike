/**
 * @author smilazzo 
 * @date 2021
 * $tep framework
 */
import AbstractStep from './AbstractStep.js'

export default class extends AbstractStep {

    constructor(routerRef,specificato,searchMode) {
        super(routerRef,specificato,searchMode);
    }
    
    async initialize() {
        throw new Error('not implemented in AbstractCollectionStep');
    }


    _initialize(c,m) {
        super.setInputData(c);
        super.setMetaInfo(m);
        // se la modalità è search c è un criteria
        console.log("search_mode = "+super.getSearchMode());
        if (super.getSearchMode() ==='search') {
            this.asyncSearch(c)
                 .then(data => {
                            console.log("i dati che sono arrivati dalla ricerca = "+JSON.stringify(data))
                            super.setSearchMode('list');
                            this._initialize(data,m);
                 });
                 return;
         }
        // se è la lista lavora
        if (this.getSearchMode() ==='list') {
            this.setCollection(c);
            this.initialize().then(x=>this.renderView()).catch(err=>{console.log("errore segnalato da UI:"+err)});
           // this.renderView();
     }
    }

    setCollection(c) {
        throw new Error('set Collection ot implemented!');
    }
    asyncSearch(criteria) {
        throw new Error('asyncSearch not implemented!')
    }

    // non passa alla view l'id del database
    sanitizeId(sourceObj) {
        return sourceObj.map(x=>{
             let newObj = {};
             for (const prop in x) {
                 if (x.hasOwnProperty(prop)) {
                     console.log(prop);
                         if (prop!=='id'){
                                 newObj[prop] = x[prop];
                     }
                 }
               }
               return newObj;
        });
     }

     sanitizeField(sourceObj,field) {
        return sourceObj.map(x=>{
             let newObj = {};
             for (const prop in x) {
                 if (x.hasOwnProperty(prop)) {
                     console.log(prop);
                         if (prop!==field){
                                 newObj[prop] = x[prop];
                     }
                 }
               }
               return newObj;
        });
     }

}