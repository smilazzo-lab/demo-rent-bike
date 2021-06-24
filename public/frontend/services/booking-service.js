export default function BookingServiceSingleton({ bookingBackend }) {

  let backend = bookingBackend;

  let istance = Object.freeze({
    queryAllProducts,
    queryProductById,
    queryAllBookings,
    queryAllCategories,
    queryAllPriceStrategies

  });

  return {
    getIstance: function () {
      return istance;
    }
  }

  async function queryAllPriceStrategies() {
    return backend.findAllPriceStrategies();
  }

  async function queryAllCategories() {
    return backend.findAllCategories();
  }

  async function queryAllProducts(criteria) {
    //  se on esiste il criterio equitvale a tutte le categori
    let i = !criteria.selectedIdCategory ? -1 : criteria.selectedIdCategory.value;
    let j = !criteria.selectedIdPriceRedux ? -1 : criteria.selectedIdPriceRedux.value;
    let flgOrderByPrice = !criteria.flgOrderByPrice ? false : criteria.flgOrderByPrice;

    console.log("i=" + i);
    console.log("j=" + j);
    return backend.findAllProducts()
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


  async function queryProductById(idProduct) {
    
    return backend.findProductById(idProduct);
 
     
    
    }


  async function queryAllBookings() {
    return backend.findAllBookings();
  }

}