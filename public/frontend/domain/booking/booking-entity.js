import BookingItem from "./booking-item-entity.js";

export default class BookingEntity {
     #id;  // todo creazione dell'id
    #from;
    #to;
     #bookingItems;
     

     constructor({id,from,to}) {
        this.#id=id;
        this.#from=from;
        this.#to=to;
        this.#bookingItems=[];
      

     }

     getId(){
         return this.#id;
     }

     addBookingItem(bookingItem) {
         if ( !bookingItem instanceof BookingItem) {
             throw new Error('not adding a valid item');
         }
         this.#bookingItems.push(bookingItem);
       

     }

     calculateTotal(){
         let total = 0;
         this.#bookingItems.forEach(item =>{
             total+= item.getItemCost(1);
             console.log("item.getCost="+item.getItemCost(1));
             console.log("il totale CARRELLO è ="+total);
            
            } );
         return total;
     }
}