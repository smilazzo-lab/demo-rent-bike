import Rate from "./rate-type.js";

export default class BookingItem {
    _qty;
    _rate;
   
    constructor(rate,qty ) {
        if (!(rate instanceof Rate)){
            throw new Error(' bike tipe fornito non è istanza di Product Object');
        }
        console.log("Creating Booking Item from the product ="+JSON.stringify(rate));
        console.log("In quantity:!"+qty);
        this._rate=rate;
        this._qty=qty;
    }

   
    _calculateItemUnityCost(interval) {
        console.log("--- calculate unity price");
        let price =  this._rate.getDailyCost();
        console.log("daily price:"+price);
       
        let costReduxStrategy = this._rate.getPriceStrategy();
        console.log("costReduxStrategy=="+costReduxStrategy.saleRatio);
        console.log(costReduxStrategy.saleRatio(interval));
        let sconto =  price *costReduxStrategy.saleRatio(interval); return price-sconto;
    }

    _getQty() {
        return this._qty;
    }

    getItemCost(interval) {
        console.log("inside getitemCost");
        console.log("debuf"+this._getQty());
        return this._getQty() * this._calculateItemUnityCost(interval);
    }
}