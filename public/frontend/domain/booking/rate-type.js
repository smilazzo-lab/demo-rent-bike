export default class Rate {

    _costReduxStrategy;
    _dailyPrice;
  

   constructor({ price_strategy, daily_cost }){
     this._dailyPrice = daily_cost;
    this.setPriceStrategy(price_strategy);
     
   }

   

    getDailyCost() {
        return this._dailyPrice;
    }

    setPriceStrategy (costReduxStrategy) {
        
       this._costReduxStrategy=costReduxStrategy;
    }

    getPriceStrategy() {
        return this._costReduxStrategy;
    }
}