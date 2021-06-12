import buildMakeBooking from './booking-factory.js';
import buildMakeBikeType from './bike-type-factory.js'
import buildMakeBookingRepository from './booking-repository.js';
import {daoBooking} from '../data-access/manifest.js';
 
const BookingFactorySingleton = buildMakeBooking();
const BikeTypeFactorySingleton = buildMakeBikeType();
const BookingRepositoryFactorySingleton = buildMakeBookingRepository({ daoBooking });

export default {BookingFactorySingleton,
                BikeTypeFactorySingleton,
                BookingRepositoryFactorySingleton};
