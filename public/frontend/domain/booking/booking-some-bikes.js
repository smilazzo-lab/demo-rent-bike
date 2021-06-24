import BookingItemEntity from './booking-item.js';
import buildMakeBooking from './booking-factory.js';
import buildMakePriceStrategy from './price-strategy-factory.js';

import RateType from './rate-type.js';
export default function BookingSomeBikesSingleton() {

  let currentBooking;
  let BookingFactorySingleton = buildMakeBooking();
  let PriceStrategyFactorySingleton = buildMakePriceStrategy();

  let istance = Object.freeze({
    createIfNotExist,
    addItemToCurrentBooking,
    getTotal,
    removeItemToCurrentBooking,
  });

  return {
    getIstance: function () {
      return istance;
    }
  };
  
   function addItemToCurrentBooking(productTo, qty=1) {

        
        let daily_cost = productTo.daily_cost;
        let id_price_strategy = productTo.id_price_strategy;
        let price_strategy = PriceStrategyFactorySingleton.getIstance().createPriceStrategy(id_price_strategy);
        let rate = new RateType({ price_strategy, daily_cost });
    
        currentBooking.addBookingItem(new BookingItemEntity(rate, qty));
        return currentBooking.getTotal();

      
  }


  function removeItemToCurrentBooking(index) {
    currentBooking.removeBookingItem(index);
    return currentBooking.getTotal();
  }

  function createIfNotExist({ from, to }) {
    // creazione dell'entità
    if (!currentBooking) {
    
      console.log(BookingFactorySingleton.getInstance());
      currentBooking = BookingFactorySingleton.getInstance().createBooking({ from, to });
    }

    return currentBooking.getId();

  }

  function getTotal() {
    return currentBooking.getTotal();
  }

}