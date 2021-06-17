import BookingEntity from '../domain/booking/booking-entity.js';
import BookingItemEntity               from '../domain/booking/booking-item-entity.js';
import  ddd from '../domain/manifest.js';





export default function BookingSomeBikesSingleton() {

  let currentBooking;

   let istance = Object.freeze({
     // prende tutti i servizi a catalodo (daily_cost, tipo di bici , tipo di sconto)
                queryProductServices,
                queryAllBookings,
                createIfNotExist,
                addItemToCurrentBooking,
                calcolaTotaleCarrello
  });

  return {
    getIstance: () =>  istance
  }

// 
async function queryProductServices() {
  return  ddd.ProductRepositorySingleton.getInstance().findAllProducts();
}

async function queryAllBookings() {
  
  return ddd.BookingRepositoryFactorySingleton.getInstance().findAllBookings();
}

  // aggancia una nuova categoria di bici alla prenotazione
   function  addItemToCurrentBooking( { idProduct,qty=1}) {
  
        ddd.ProductRepositorySingleton.getInstance().findProductById(idProduct)
        .then(x=>x) .then( x => {
          console.log("x="+x.getDailyCost());
          currentBooking.addBookingItem(new BookingItemEntity(x,qty));
          

        });
       
       

  }

  function createIfNotExist({from, to }) {
      // creazione dell'entità
      try {
        if (!currentBooking ){
         // console.log(ddd);
          console.log(ddd.BookingFactorySingleton.getInstance());
          currentBooking =   ddd.BookingFactorySingleton.getInstance().createBooking({from,to});
        }

        return currentBooking.getId();
      }
      catch(error) {
        console.log(error);
        return null;
      }
    }

    function calcolaTotaleCarrello(){
      return currentBooking.calculateTotal();
    }
}