import BookingItem from "./booking-item-entity.js";

export default class BookingEntity {
     #id;  // todo creazione dell'id
     #interval;
     #name;
     #surname;
     #email;
     #phoneNo;
     #createdAt;
     #updatedAt;
     #bookingItems;
     #totalPrize=0;
     #flgBozza ;

     constructor({id,interval,name,surname,email,phoneNo,createdAt}) {
        this.#id=id;
        this.#email=email;
        this.#name=name;
        this.#surname=surname;
        this.#interval=interval;
        this.#phoneNo=phoneNo;
        this.#bookingItems=[];
        this.#createdAt=createdAt;
        this.#flgBozza=true;

     }

     addBookingItem(bookingItem) {
         if ( !bookingItem instanceof BookingItem) {
             throw new Error('not adding a valid item');
         }
         bookingItem.push(bookingItem);
       

     }

     calculateTotal(){
         let total = 0;
         this.#bookingItems.forEach((item) => total+= item.getItemCost());
         return total;
     }
}