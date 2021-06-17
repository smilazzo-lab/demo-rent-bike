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
                getTotal,
                removeItemToCurrentBooking
  });

  return {
    getIstance: function(){
       return istance;
    } 
  }

// 
async function queryProductServices() {
  return  ddd.ProductRepositorySingleton.getInstance().findAllProducts();
}

async function queryAllBookings() {
  
  return ddd.BookingRepositoryFactorySingleton.getInstance().findAllBookings();
}

  // aggancia una nuova categoria di bici alla prenotazione
   async function   addItemToCurrentBooking( { idProduct,qty=1}) {
  
       return ddd.ProductRepositorySingleton.getInstance().findProductById(idProduct)
         .then( x => {
          console.log("x="+x.getDailyCost());
          currentBooking.addBookingItem(new BookingItemEntity(x,qty));
          return currentBooking.getTotal();

        });
       
       

  }
  function  removeItemToCurrentBooking(index){
    currentBooking.removeBookingItem(index);
    return currentBooking.getTotal();
  }

  function createIfNotExist({from, to }) {
      // creazione dell'entità
    
        if (!currentBooking ){
         // console.log(ddd);
          console.log(ddd.BookingFactorySingleton.getInstance());
          currentBooking =   ddd.BookingFactorySingleton.getInstance().createBooking({from,to});
        }

        return currentBooking.getId();
      
    }

    function getTotal(){
       return currentBooking.getTotal();
    }
}