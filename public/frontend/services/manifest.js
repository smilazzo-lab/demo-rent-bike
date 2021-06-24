import BookingServiceSingleton from './booking-service.js'
import bookingBackend from '../backend/manifest.js';

const BookingService = BookingServiceSingleton({bookingBackend});


export default BookingService;