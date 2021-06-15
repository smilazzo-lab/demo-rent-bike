import buildMakeBooking from './booking/booking-factory.js';
import buildMakeBookingRepository from './catalog/product-repository.js';
import buildMakeBikeProductRepository from './catalog/product-repository.js';
import buildMakePriceStrategy from './price-strategy/price-strategy-factory.js';
import daoBooking from '../data-access/manifest.js';
 

const BookingRepositoryFactorySingleton = buildMakeBookingRepository({ daoBooking });
const ProductRepositorySingleton = buildMakeBikeProductRepository({ daoBooking });
const PriceStrategyFactorySingleton = buildMakePriceStrategy();


let ddd = {BookingFactorySingleton : buildMakeBooking(),
    BookingRepositoryFactorySingleton,
   ProductRepositorySingleton,
   PriceStrategyFactorySingleton};

export default  ddd;

            
