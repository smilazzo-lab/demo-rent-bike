import BookingItem               from '../domain/booking-item.js';
import { BikeTypeFactorySingleton, BookingRepositoryFactorySingleton, BookingFactorySingleton} from '../domain/manifest.js';

export default function BookingServiceFactorySingleton() {
  
  let istance = Object.freeze({
                createBooking,
                addItemToBookingId
  });

  return {
    getIstance: () =>  istance
  }

  function addItemToBookingId(id,codBikeType,qty) {

     let bookingRepository = BookingRepositoryFactorySingleton.getInstance();
     let bikeTypeFactory = BikeTypeFactorySingleton.getInstance();
     // lettura dal repo della prenotazione
     let bookingEntity = bookingRepository.findById(id);
     // aggiunge il tipo di bicicletta
     let bikeType = bikeTypeFactory.createBikeType(codBikeType);
     bookingEntity.addBookingItem(new BookingItem(bikeType,
                                        bookingEntity.getInterval(),
                                        qty,
                                        new CostReduxStrategy3Days()
     ));
    
     bookingRepository.save(bookingEntity);
  }

  function createBooking({name,surname,email,phoneNo,period }) {
      // creazione dell'entità
      try {
        let bookingFactory = BookingFactorySingleton.getInstance();
        return bookingFactory.createBooking({name,surname,email,phoneNo,period});
      
      }
      catch(error) {
        console.log(error);
        return null;
      }
  
    }

   
}