import BookingItemEntity               from '../domain/booking/booking-item-entity.js';
import  ddd from '../domain/manifest.js';





export default function BookingServiceFactorySingleton() {

   let istance = Object.freeze({
     // prende tutti i servizi a catalodo (daily_cost, tipo di bici , tipo di sconto)
                queryProductServices,
                createBooking,
                addItemToBookingId
  });

  return {
    getIstance: () =>  istance
  }

// 
async function queryProductServices() {
  console.log("+++++++++++++++++++");
  return  ddd.ProductRepositorySingleton.getInstance().findAllProducts();
}

  // aggancia una nuova categoria di bici alla prenotazione
  function addItemToBookingId(bookingId,  { codProduct,qty=1}) {
    try{
        let BookingRepository = BookingRepositoryFactorySingleton.getInstance();
        let ProductRepository = ProductRepositorySingleton.getInstance();
        let bookingEntity = BookingRepository.findById(bookingId);
        let productEntity = ProductRepository.findProductByCod(codProduct);

        bookingEntity.addBookingItem(new BookingItemEntity(productEntity,qty));
       // bookingRepository.save(bookingEntity);
    } catch(ex) {
      console.error(ex);
      
    }
  }

  function createBooking({name,surname,email,phoneNo,period }) {
      // creazione dell'entità
      try {
        let BookingFactory = BookingFactorySingleton.getInstance();
        return BookingFactory.createBooking({name,surname,email,phoneNo,period});
      }
      catch(error) {
        console.log(error);
        return null;
      }
    }
}