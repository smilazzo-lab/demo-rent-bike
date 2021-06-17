export default class ProductEntity {

    #costReduxStrategy;
    #dailyPrice;
    #id;

   constructor({ idProduct=-1, daily_cost }){
     this.#dailyPrice = daily_cost;
     this.#id=idProduct;
     
   }

   getId() {
       return this.#id;
   }

    getDailyCost() {
        return this.#dailyPrice;
    }

    setPriceStrategy (costReduxStrategy) {
        
       this.#costReduxStrategy=costReduxStrategy;
    }

    getPriceStrategy() {
        return this.#costReduxStrategy;
    }
}