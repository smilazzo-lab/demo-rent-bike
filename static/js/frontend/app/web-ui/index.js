// dipendenza dal layer controller
import CatCollectionStep        from './steps/CatCollectionStep.js';
import CatDetailStep            from './steps/CatDetailStep.js';
import CatLookupRaceStep        from './steps/CatLookupRaceStep.js';
import HomeStep                 from './steps/HomeStep.js';

// dipendenze dal framework
import makeWebUi from '../../../step-fmw/routing/StepController.js';
import makeControllerLoader from '../../../step-fmw/routing/StepController.js';

import FileUpload from '../../StepFmw/data-binding/FileUpload.js'
import StepLoader from '../../StepFmw/routing/StepLoader.js';


// Definisco l'associazione Controller/Etichetta
let stepLoader = makeControllerLoader();

stepLoader.use('STP.HOME_NOLOG',HomeStep);
stepLoader.use('STP.LST_CAT',CatCollectionStep);
stepLoader.use('STP.VIS_CAT',CatDetailStep);
stepLoader.use('STP.LKP_CAT',CatLookupRaceStep);

const webUi= makeWebUi();
// Lettura del backend di Routes.json 
// che associa URL a Etichette
fetch('/static/js/backend/Routes.json')
   .then( (data) => data.json())
   .then(function (routes)  {
       console.log("STARTING APPLICATION");
       window.FileUpload      = FileUpload;
       // START
       makeWebUi.startListening(routes,stepLoader);
      
   }
   );



const webStepUi = webUi;
webStepUi.installAndStart();

export default webStepUi;