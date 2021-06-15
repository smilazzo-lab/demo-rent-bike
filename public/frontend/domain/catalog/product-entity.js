export default class ProductEntity {

    #costReduxStrategy;
    #dailyPrice;
    #id;

   constructor({ id=-1, dailyPrice }){
     this.#dailyPrice = dailyPrice;
     this.#id=id;
   }

   getId() {
       return this.#id;
   }

    getDailyCost() {
        return this.#dailyPrice;
    }

    setPriceStrategy (costReduxStrategy) {
        if (!costReduxStrategy instanceof CostReduxStrategyInterface){
            throw new Error('setCostReduxStrategy non ha un oggetto CostReduxStrategyInterface');
        }
       this.#costReduxStrategy=costReduxStrategy;
    }

    getPriceStrategy() {
        return this.#costReduxStrategy;
    }
}