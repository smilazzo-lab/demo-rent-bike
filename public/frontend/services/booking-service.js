export default function BookingServiceSingleton({ restBackend }) {

  
  console.log("inside booking service restBackend is="+restBackend);
 

  let istance = Object.freeze({
    queryAllServices,
    queryServiceById,
    queryAllBookings,
    queryAllDizBikeType,
    queryAllPriceStrategies

  });

  

  return {
    getIstance: function () {
      return istance;
    }
  }

  async function queryAllPriceStrategies() {
    return restBackend.callAPI({ uri: "/diz-price-reduxes" })
    .then(data => data.json())
    .then(typeList => {
      return typeList.map(b => {
        let codice = b.id;
        let descrizione = b.DES_PRICE_REDUX;


        return Object.freeze({
          codice,
          descrizione
        });
      });

    }
    );
  }

  async function queryAllDizBikeType() {
    
    return restBackend.callAPI({ uri: "/diz-bike-types" })
      .then(data => data.json())
      .then(typeList => {
        return typeList.map(b => {
          let codice = b.id;
          let descrizione = b.DES_BIKE_TYPE;


          return Object.freeze({
            codice,
            descrizione
          });
        });

      }
      );
  }

  async function queryAllServices(criteria) {
    //  se on esiste il criterio equitvale a tutte le categori
    let i = !criteria.selectedIdCategory ? -1 : criteria.selectedIdCategory.value;
    let j = !criteria.selectedIdPriceRedux ? -1 : criteria.selectedIdPriceRedux.value;
    let flgOrderByPrice = !criteria.flgOrderByPrice ? false : criteria.flgOrderByPrice;

    console.log("i=" + i);
    console.log("j=" + j);
    return restBackend.callAPI({ uri: "/services" })
    .then(data => data.json())
    .then(productList => {
      let prg =
        productList.map(x => {
          // find All Products ---> restituisce un Array [] di Product
          // TODO: sostituzione con let p = new ProductTO()
          // p.setType(x.bike_category.id);
          // p.setId(x.id);
          // ecc ecc..
          // return p;
          let type = x.bike_category.id;
          let id = x.id;
          let description = x.bike_category.DES_BIKE_TYPE;
          let unityCost = x.daily_cost;
          let quantity = 1;
          let formats = x.bike_category.picture[0].formats;
          let format = formats['large'] || formats['medium'] || formats['small'] || formats['thumbnail'];
          let picture_uri = format.url;
          let des_price_strategy = x.price_strategy.DES_PRICE_REDUX;
          let id_price_strategy =x.price_strategy.id;
          let id_bike_category=x.bike_category.id;

          console.log("dao::des_price_Strategy" + des_price_strategy);

          return {
            id,
            type, description, unityCost, quantity, picture_uri, des_price_strategy,id_price_strategy,id_bike_category
          };

        });

      return prg;

    }
    )


   
   


    // se tutte le CATEGORIE (=-1) Dammi tutti i prodotti
      .then(
        listOfProd =>
          i == -1 ? listOfProd
            : listOfProd.map(x => x).filter(prod => prod.id_bike_category == i)

      )

      .then(listOfProd => j == -1 ?
        listOfProd
        : listOfProd.map(x => x)
          .filter(prod => prod.id_price_strategy == j)
      )
      .then(listOfProd => flgOrderByPrice === false ? listOfProd
        : listOfProd.map(x => x)
          .slice()
          .sort((a, b) => a - b > 0)
      );


  }



  async function queryServiceById(idService) {
    return restBackend.callAPI({ uri: '/services/' + idService })
      .then(data => data.json())
      .then(x => { return Object.freeze({ daily_cost: x.daily_cost, id_price_strategy: x.price_strategy.id }); });

     
    
    }


  async function queryAllBookings() {
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

}