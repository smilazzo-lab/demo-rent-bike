import BookingItem from "./booking-item.js";

export default class BookingEntity {
     _id;  // todo creazione dell'id
    _from;
    _to;
     _bookingItems;
     _total=0;
     

     constructor({id,from,to}) {
        this._id=id;
        this._from=from;
        this._to=to;
        this._bookingItems=[];
      

     }

     getId(){
         return this._id;
     }

     addBookingItem(bi) {
         if ( !bi instanceof BookingItem) {
             throw new Error('not adding a valid item');
         }
         this._bookingItems.push(bi);
         console.log("items="+JSON.stringify( this._bookingItems));
         this.calculateTotal();
       

     }

     removeBookingItem(index){
        this._bookingItems.splice(index,1);
         this.calculateTotal();
     }

     calculateTotal(){
         this._total=0;
         this._bookingItems.forEach((item) =>{
             this._total+= item.getItemCost(1);
             console.log("item.getCost="+item.getItemCost(1));
             console.log("il totale CARRELLO è ="+this._total);
            
            } );
         
     }

     getTotal(){
         this.calculateTotal();
         return this._total;
     }
}