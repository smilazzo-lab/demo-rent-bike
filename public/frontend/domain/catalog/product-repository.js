import ProductEntity from "./product-entity.js";
import PriceStrategyFactorySingleton from '../manifest.js';

export default function buildMakeBikeProductRepository ({ daoBooking}) {
 
  /*
 

  [
    {
        "id": 1,
        "bike_category": {
            "id": 1,
            "DES_BIKE_TYPE": "CITY BIKE",
            "service": null,
            "published_at": "2021-06-14T10:10:48.021Z",
            "created_at": "2021-06-14T10:10:42.444Z",
            "updated_at": "2021-06-14T10:10:48.057Z"
        },
        "price_strategy": {
            "id": 1,
            "COD_PRICE_REDUX": "0",
            "DES_PRICE_REDUX": "NESSUNA RIDUZIONE DI PREZZO",
            "published_at": "2021-06-14T10:08:46.321Z",
            "created_at": "2021-06-14T10:08:41.109Z",
            "updated_at": "2021-06-14T10:08:46.351Z"
        },
        "published_at": "2021-06-15T09:51:00.973Z",
        "created_at": "2021-06-15T09:50:57.807Z",
        "updated_at": "2021-06-15T09:51:01.035Z"
    }
]
*/
    async function  findAllProducts() {
      console.log("+++++++++++++++++++");
      return daoBooking.findAllProducts();
    }

    function findProductByCod(codProduct) {

      let {id,daily_cost,price_strategy}   = daoBooking.findBikeTypeByCod(codProduct);
      let codPriceStrategy = price_strategy.id;
      let productEntity = new ProductEntity({id,daily_cost});
      let priceReduxStrategy=PriceStrategyFactorySingleton.getInstance().createPriceStrategy(codPriceStrategy);
      productEntity.setPriceStrategy(priceReduxStrategy);
     return productEntity;
    }

    let repository = Object.freeze({
        findProductByCod,
        findAllProducts
        
    });
    // PATTERN SINGLETON
    return {
             getInstance: function () {
                 return repository;
            }      
          }
    }
     