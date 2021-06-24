import BookingItemEntity from '../domain/booking/booking-item.js';
import BookingServiceSingleton from '../services/manifest.js';
import ddd from '../domain/manifest.js';
import Rate from '../domain/booking/rate.js';
export default function BookingSomeBikesSingleton() {

  let currentBooking;

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

/*
  // aggancia una nuova categoria di bici alla prenotazione
  async function addItemToCurrentBooking({ idProduct, qty = 1 }) {

    return BookingServiceSingleton.getInstance().queryProductById(idProduct)
      .then(x => {
        let daily_cost = x.daily_cost;
        let id_price_strategy = x.id_price_strategy;
        console.log("daily_cost=" + daily_cost);
        console.log("id_price_Strategy" + id_price_strategy);
        let rate = new Rate({ idProduct, daily_cost });
        let priceStrategy = ddd.PriceStrategyFactorySingleton.getIstance().createPriceStrategy(id_price_strategy);
        rate.setPriceStrategy(priceStrategy);
        console.log("rate=" + rate);
        return rate;
      })
      .then(x => {
        console.log("x=" + x.getDailyCost());
        currentBooking.addBookingItem(new BookingItemEntity(x, qty));
        return currentBooking.getTotal();

      });
  }
*/


   function addItemToCurrentBooking(productTo, qty=1) {

        
        let daily_cost = productTo.daily_cost;
        let id_price_strategy = productTo.id_price_strategy;
        let price_strategy = ddd.PriceStrategyFactorySingleton.getIstance().createPriceStrategy(id_price_strategy);
        let rate = new Rate({ price_strategy, daily_cost });
    
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
      // console.log(ddd);
      console.log(ddd.BookingFactorySingleton.getInstance());
      currentBooking = ddd.BookingFactorySingleton.getInstance().createBooking({ from, to });
    }

    return currentBooking.getId();

  }

  function getTotal() {
    return currentBooking.getTotal();
  }

}