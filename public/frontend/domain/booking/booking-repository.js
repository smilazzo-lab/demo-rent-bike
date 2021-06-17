export default function buildMakeBookingRepository ({daoBooking}) {

    function findById(id) {
      return daoBooking.findById(id);
    }

    async function findAllBookings() {
        console.log("Inside BookingRepository::findAllBookings()");
        return daoBooking.findAllBookings();
    }

    function save(bookingEntity) {
        daoBooking.save({
            flatdata
        });
    }

    let repository = Object.freeze({
        findById,
        findAllBookings,
        save
    });
    // PATTERN SINGLETON
    return {
             getInstance: function () {
                 return repository;
            }      
          }

}
     