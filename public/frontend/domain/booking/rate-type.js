export default class Rate {

    #costReduxStrategy;
    #dailyPrice;
  

   constructor({ price_strategy, daily_cost }){
     this.#dailyPrice = daily_cost;
    this.setPriceStrategy(price_strategy);
     
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