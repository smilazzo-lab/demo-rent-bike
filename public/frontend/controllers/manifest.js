import StepLoader from '../../step-fmw/routing/StepLoader.js';

import HomeStep from './HomeController.js';
import BookingDetailStep from './EditBookingController.js';
import BookingCollectionStep from './CollectionBookingController.js';
import BookingLookupProducts from './LookupProductsController.js';
import WizardBookingController from './WizardBookingController.js';
import EditItemController from './EditItemController.js';



 export default function makeStepLoader({renderer,setErrorMsg}) {
  
        const stepLoader = new StepLoader({renderer,setErrorMsg});
      
        // associo ad ogni etichetta una class
        stepLoader.use('STP.HOME_NOLOG',HomeStep);
        stepLoader.use('STP.LST_BOOKINGS',BookingCollectionStep);
        stepLoader.use('STP.VIS_BOOKING',BookingDetailStep);
        stepLoader.use('STP.LKP_WIZ_PRODUCTS',BookingLookupProducts);
        stepLoader.use('STP.WIZ_BOOKING',WizardBookingController);
        stepLoader.use('STP.WIZ_BOOKING.UPD_ITEM',EditItemController);
        
        return stepLoader;
   
}








