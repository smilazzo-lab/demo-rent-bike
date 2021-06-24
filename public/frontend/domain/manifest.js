import buildMakeBooking from './booking/booking-factory.js';
import buildMakePriceStrategy from './booking/price-strategy-factory.js';

let ddd = {  
    BookingFactorySingleton : buildMakeBooking(),
    PriceStrategyFactorySingleton: buildMakePriceStrategy()
}

export default  ddd;

            
