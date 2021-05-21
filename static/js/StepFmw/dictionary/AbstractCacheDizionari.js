export default class AbstractCacheDizionari{
    static cache = new Map();

    

    static  getDizionario(name)  {

        let incache = this.cache.get(name);
      //  console.log('cache = '+cache);

       if (incache) return incache;
        // chiamata al business
      //  console.log(this);
        this.cache.set(name, this.prototype['getDizionario'+name].apply());
        return this.cache.get(name);
        
}
}