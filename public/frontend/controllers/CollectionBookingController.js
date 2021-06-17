/**
 * @author smilazzo 
 * @date 2021
 * $tep framework
 */

import AbstractCollectionStep from "../../step-fmw/stepping/AbstractCollectionStep.js";
import BookingServiceSingleton from "../use-cases/manifest.js";

export default class  extends AbstractCollectionStep{

    $_model ={
        $_0___bookings: {
            listAllBookings:[]
        }
    };

    //#bookings = [];
    #header=['booking-id','cognome','nome','dal','al'];
    

    constructor(stepContext,specificato,search_mode) {
        super(stepContext,specificato,search_mode);
    }

    getElementOfCollection(index) {
        return this.$_model.$_0___bookings.listAllBookings[index];
    }

    setCollection(data){
        this.$_model.$_0___bookings.listAllBookings=data;
    }

    async asyncSearch(criteria) {
        console.log("inside CollectionBookingController::asyncSearch");
      return await BookingServiceSingleton.getIstance()
            .queryAllBookings();
    }

 
    
    // lifecycle 0
    initialize() {
    }

   

    renderView() {
        // TOLGO id dalla visualizzazzione
        let data = super.sanitizeId(this.$_model.$_0___bookings.listAllBookings);
       // data = super.sanitizeField(data,'name');

        super.getWebUi().renderer({
            templateName:'bookings',
            templateType:'collection',
            templateData: JSON.stringify({header:this.#header,data}),
            templateMetaInfo: super.getMetaInfo(),
            templateBindingZone:null});
             }
        

}