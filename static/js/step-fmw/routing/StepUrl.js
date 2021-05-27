export default class  {

    #url
    #method  // {initialize || callback || annulla || lookup}

    constructor(url='/',method='initialize') {
        this.#url=url;
        this.#method=method;
    }

    getUrl() {
        return this.#url;
    }

    getMethod(){
        return this.#method;
    }

    isAnInitializeRoute() {
        return this.#method==='initialize'?true:false;
    }

    isACallbackRoute() {
        return this.#method==='callback'?true:false;
    }
}