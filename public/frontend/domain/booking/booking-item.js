import Rate from "./rate.js";

export default class BookingItem {
    #qty;
    #rate;
   
    constructor(rate,qty ) {
        if (!(rate instanceof Rate)){
            throw new Error(' bike tipe fornito non è istanza di Product Object');
        }
        console.log("Creating Booking Item from the product ="+JSON.stringify(rate));
        console.log("In quantity:!"+qty);
        this.#rate=rate;
        this.#qty=qty;
    }

   
    #calculateItemUnityCost(interval) {
        console.log("--- calculate unity price");
        let price =  this.#rate.getDailyCost();
        console.log("daily price:"+price);
       
        let costReduxStrategy = this.#rate.getPriceStrategy();
        console.log("costReduxStrategy=="+costReduxStrategy.saleRatio);
        console.log(costReduxStrategy.saleRatio(interval));
        let sconto =  price *costReduxStrategy.saleRatio(interval) /100;
        console.log("daily sconto:"+sconto);
        return (price-sconto);
    }

    #getQty() {
        return this.#qty;
    }

    getItemCost(interval) {
        console.log("inside getitemCost");
        console.log("debuf"+this.#getQty());
        return this.#getQty() * this.#calculateItemUnityCost(interval);
    }
}