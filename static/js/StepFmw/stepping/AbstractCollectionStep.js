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
    
    initialize() {
        throw new Error('not implemented in AbstractCollectionStep');
    }


    _initialize(c,m) {
        super.setInputData(c);
        super.setMetaInfo(m);
        // se la modalità è search c è un criteria
        console.log("search_mode = "+super.getSearchMode());
        if (super.getSearchMode() ==='search') {
            this.asyncSearch(c)
                .then(data=>data.json())
                 .then(data => {
                            super.setSearchMode('list');
                            this._initialize(data,m);
                 });
         }
        // se è la lista lavora
        if (this.getSearchMode() ==='list') {
            this.initialize();
            super.renderView();
     }
    }

    asyncSearch(criteria) {
        throw new Error('asyncSearch not implemented!')
    }

}