import ProductEntity from "./product-entity.js";
import ddd from '../manifest.js';
import Price3DaysStrategy from '../price-strategy/price-strategy-3days.js';

export default function buildMakeBikeProductRepository ({ daoBooking}) {
 

  async function  findAllPriceStrategies() {
    return daoBooking.findAllPriceStrategies();
  }


    async function  findAllProducts() {
      return daoBooking.findAllProducts();
    }

    async function  findAllCategories() {
      return daoBooking.findAllCategories();
    }

    async function findProductById(idProduct) {
    
      return daoBooking.findProductById(idProduct)
      .then (x => {
        let daily_cost = x.daily_cost;
        let id_price_strategy=x.id_price_strategy;
        console.log("daily_cost="+daily_cost);
        console.log("id_price_Strategy"+id_price_strategy);
        let productEntity = new ProductEntity({idProduct,daily_cost});
       
        let priceStrategy = ddd.PriceStrategyFactorySingleton.getIstance().createPriceStrategy(id_price_strategy);
        productEntity.setPriceStrategy(priceStrategy);
        console.log("productEntity="+productEntity);
        return productEntity;
                  });
       
      
      }
    
      
     
    

    let repository = Object.freeze({
        findProductById,
        findAllProducts,
        findAllCategories,
        findAllPriceStrategies
        
    });
    // PATTERN SINGLETON
    return {
             getInstance: function () {
                 return repository;
            }      
          }
    }
     