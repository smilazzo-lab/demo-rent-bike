import ProductEntity from "../catalog/product-entity.js";

export default class BookingItemEntity {
    #qty;
    #tipology;
   
    constructor(productEntity,qty ) {
        if (!(productEntity instanceof ProductEntity)){
            throw new Error(' bike tipe fornito non è istanza di Product Object');
        }
        console.log("Creating Booking Item from the product ="+JSON.stringify(productEntity));
        console.log("In quantity:!"+qty);
        this.#tipology=productEntity;
        this.#qty=qty;
    }

   
    #calculateItemUnityCost(interval) {
        console.log("--- calculate unity price");
        let price =  this.#tipology.getDailyCost();
        console.log("daily price:"+price);
       
        let costReduxStrategy = this.#tipology.getPriceStrategy();
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