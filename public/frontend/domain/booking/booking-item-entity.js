import ProductEntity from "../catalog/product-entity.js";

export default class BookingItemEntity {
    #qty;
    #tipology;
   
    constructor(productEntity,qty) {
        if (!(productEntity instanceof ProductEntity)){
            throw new Error(' bike tipe fornito non è istanza di Product Object');
        }
        this.#tipology=productEntity;
        this.#qty=qty;
    }

   
    #calculateItemUnityCost(interval) {
        let price =  this.#tipology.getDailyCost();
        let sconto=0;
        let costReduxStrategy = this.#tipology.getPriceStrategy() || new DefaultPriceStrategy();
        sconto =  cost *costReduxStrategy.saleRatio(interval) /100;
        return (price-sconto);
    }

    #getQty() {
        return this.#qty;
    }

    getItemCost(interval) {
        return this.#getQty() * this.#calculateItemUnityCost(interval);
    }
}