import BookingEntity from '../domain/booking/booking-entity.js';
import BookingItemEntity               from '../domain/booking/booking-item-entity.js';
import  ddd from '../domain/manifest.js';





export default function BookingSomeBikesSingleton() {

  let currentBooking;

   let istance = Object.freeze({
     // prende tutti i servizi a catalodo (daily_cost, tipo di bici , tipo di sconto)
                queryProductServices,
                queryAllBookings,
                queryAllCategories,
                queryAllPriceStrategies,
                createIfNotExist,
                addItemToCurrentBooking,
                getTotal,
                removeItemToCurrentBooking,

  });

  return {
    getIstance: function(){
       return istance;
    } 
  }



// 



async function queryAllPriceStrategies() {
  return  ddd.ProductRepositorySingleton
  .getInstance().findAllPriceStrategies();
}

async function queryAllCategories() {
  return  ddd.ProductRepositorySingleton
  .getInstance().findAllCategories();
}

async function queryProductServices(criteria) {
 //  se on esiste il criterio equitvale a tutte le categori
 let i = !criteria.selectedIdCategory?-1: criteria.selectedIdCategory.value;
 let j = !criteria.selectedIdPriceRedux?-1:criteria.selectedIdPriceRedux.value;
 let flgOrderByPrice = !criteria.flgOrderByPrice?false:criteria.flgOrderByPrice;
 
 console.log("i="+i);
 console.log("j="+j);
  return  ddd.ProductRepositorySingleton
          .getInstance().findAllProducts()
          // se tutte le CATEGORIE (=-1) Dammi tutti i prodotti
          .then(
            listOfProd=> 
               i==-1?  listOfProd
                               :listOfProd.map(x=>x).filter(prod=> prod.id_bike_category==i)
                                          
            )
            
           .then(listOfProd=>j==-1?
                                listOfProd
                                : listOfProd.map(x=>x)
                                            .filter(prod=> prod.id_price_strategy==j)
            )
            .then(listOfProd=> flgOrderByPrice===false? listOfProd
                            :listOfProd.map(x=>x)
                            .slice()
                            .sort((a,b)=>a-b>0)
                            );
            
              
}

async function queryAllBookings() {
  
  return ddd.BookingRepositoryFactorySingleton.getInstance().findAllBookings();
}

  // aggancia una nuova categoria di bici alla prenotazione
   async function   addItemToCurrentBooking( { idProduct,qty=1}) {
  
       return ddd.ProductRepositorySingleton.getInstance().findProductById(idProduct)
         .then( x => {
          console.log("x="+x.getDailyCost());
          currentBooking.addBookingItem(new BookingItemEntity(x,qty));
          return currentBooking.getTotal();

        });
       
       

  }

  

  function  removeItemToCurrentBooking(index){
    currentBooking.removeBookingItem(index);
    return currentBooking.getTotal();
  }

  function createIfNotExist({from, to }) {
      // creazione dell'entità
    
        if (!currentBooking ){
         // console.log(ddd);
          console.log(ddd.BookingFactorySingleton.getInstance());
          currentBooking =   ddd.BookingFactorySingleton.getInstance().createBooking({from,to});
        }

        return currentBooking.getId();
      
    }

    function getTotal(){
       return currentBooking.getTotal();
    }
  }