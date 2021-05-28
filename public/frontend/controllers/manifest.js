import StepLoader from '../../step-fmw/routing/StepLoader.js';
import HomeStep from './HomeController.js';
import CatDetailStep from './EditCatController.js';
import CatCollectionStep from './CollectionCatController.js';
import CatLookupRaceStep from './LookupCatController.js';



 export default function makeStepLoader({renderer}) {
  
        const stepLoader = new StepLoader({renderer});
      
        // associo ad ogni etichetta una class
        stepLoader.use('STP.HOME_NOLOG',HomeStep);
        stepLoader.use('STP.LST_CAT',CatCollectionStep);
        stepLoader.use('STP.VIS_CAT',CatDetailStep);
        stepLoader.use('STP.LKP_CAT',CatLookupRaceStep);
        
        return stepLoader;
   
}








