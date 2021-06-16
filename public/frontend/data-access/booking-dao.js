export default function BookingDaoFactory({ backend }) {

  let restBackend = backend;

  async function findAll() {
    // 
    return restBackend.callApi({ uri: '/posts' })
      .then(data => data.json());


  }

  async function findAllProducts() {
    return restBackend.callAPI({ uri: "/services" })
      .then(data => data.json())
      .then(productList => {
        let prg =
          productList.map(x => {
            let type = x.bike_category.id;
            let description = x.bike_category.DES_BIKE_TYPE;
            let unityCost = x.daily_cost;
            let quantity = 1;
            let formats = x.bike_category.picture[0].formats;
            let format = formats['small'] || formats['medium'] || formats['large'] || formats['thumbnail'];
            let picture_uri = format.url;


            // PROJECTIONS
            return Object.freeze({ type, description, unityCost, quantity, picture_uri });

          });

        return prg;

      }
      );


    //.error(err=>console.log(error));



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
    findAll,
    saveBooking,
    findAllProducts

  });

  return dao;

}