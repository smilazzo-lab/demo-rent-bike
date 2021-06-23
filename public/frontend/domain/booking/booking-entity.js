import BookingItem from "./booking-item-entity.js";

export default class BookingEntity {
     #id;  // todo creazione dell'id
    #from;
    #to;
     #bookingItems;
     #total=0;
     

     constructor({id,from,to}) {
        this.#id=id;
        this.#from=from;
        this.#to=to;
        this.#bookingItems=[];
      

     }

     getId(){
         return this.#id;
     }

     addBookingItem(bi) {
         if ( !bi instanceof BookingItem) {
             throw new Error('not adding a valid item');
         }
         this.#bookingItems.push(bi);
         console.log("items="+JSON.stringify( this.#bookingItems));
         this.calculateTotal();
       

     }

     removeBookingItem(index){
        this.#bookingItems.splice(index,1);
         this.calculateTotal();
     }

     calculateTotal(){
         this.#total=0;
         this.#bookingItems.forEach((item) =>{
             this.#total+= item.getItemCost(1);
             console.log("item.getCost="+item.getItemCost(1));
             console.log("il totale CARRELLO è ="+this.#total);
            
            } );
         
     }

     getTotal(){
         this.calculateTotal();
         return this.#total;
     }
}