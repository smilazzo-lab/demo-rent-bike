export default class BookingItem {
    #qty;
    #unityCost=0;
    #tipology;

    constructor(bikeType,interval,qty,costReduxStrategy) {
        this.#tipology=bikeType;
        this.#calculateItemUnityCost(interval,costReduxStrategy);
        this.#qty=qty;
    }

   

    #calculateItemUnityCost(interval,costReduxStrategy=null) {
        let cost =  this.#tipology.getDailyCost();
        let sale=0;
        if (costReduxStrategy){
             sale =  cost *costReduxStrategy.saleRatio(interval) /100;
        }
        this.#unityCost=cost-sale;
    }

    getQty() {
        return this.#qty;
    }

    getItemCost() {
        return this.getQty() * this.#unityCost;
    }
}