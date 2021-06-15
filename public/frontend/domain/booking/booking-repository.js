export default function buildMakeBookingRepository ({daoBooking}) {

    function findById(id) {
      return daoBooking.findById(id);
    }

    function save(bookingEntity) {
        daoBooking.save({
            flatdata
        });
    }

    let repository = Object.freeze({
        findById,
        save
    });
    // PATTERN SINGLETON
    return {
             getInstance: function () {
                 return repository;
            }      
          }

}
     