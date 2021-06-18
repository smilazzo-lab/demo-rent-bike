export default function BookingDaoFactory({ backend }) {

  let restBackend = backend;




  async function findAllBookings() {
    console.log("inide BOokingDao::findAllBookings");
    return restBackend.callAPI({ uri: '/bookings' })
      .then(data => data.json())
      .then(bookingList => {
        console.log(JSON.stringify(bookingList));
        return bookingList.map(b => {
          let id = b.id;
          let booking_uuid = b.booking_uuid;
          let surname = b.surname;
          let name = b.name;
          let date_ini = b.intervalFrom;
          let date_fin = b.intervalTo;

          return Object.freeze({
            id,
            booking_uuid, surname, name, date_ini, date_fin
          });
        });

      }
      );
  }

  async function findAllProducts() {

    return restBackend.callAPI({ uri: "/services" })
      .then(data => data.json())
      .then(productList => {
        let prg =
          productList.map(x => {
            let type = x.bike_category.id;
            let id=x.id;
            let description = x.bike_category.DES_BIKE_TYPE;
            let unityCost = x.daily_cost;
            let quantity = 1;
            let formats = x.bike_category.picture[0].formats;
            let format = formats['large'] || formats['medium'] || formats['small'] || formats['thumbnail'];
            let picture_uri = format.url;
            let des_price_strategy = x.price_strategy.DES_PRICE_REDUX;
            console.log("dao::des_price_Strategy"+des_price_strategy);


            // PROJECTIONS
            return Object.freeze({ 
              id,
              type, description, unityCost, quantity, picture_uri,des_price_strategy });

          });

        return prg;

      }
      );


    //.error(err=>console.log(error));



  }

  async function findProductById(ideProduct) {
     return restBackend.callAPI({ uri: '/services/' + ideProduct })
      .then(data => data.json())
      .then(x => {return Object.freeze({daily_cost:x.daily_cost,id_price_strategy:x.price_strategy.id});});
      
  }

  async function saveBooking(dataInfo) {

    return restBackend.callApi({
      uri: '/bookings', method: 'POST',
      body: {
        idepost: dataInfo.id,
        titolo: 'no title',
        descrizione: 'no description',
        tms_pubblicazione: dataInfo.getCreatedOn()
      }
    })
      .then(data => data.json());
  }



  let dao = Object.freeze({
    findAllBookings,
    saveBooking,
    findAllProducts,
    findProductById

  });

  return dao;

}