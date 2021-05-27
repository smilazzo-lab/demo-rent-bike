/**
 * @author smilazzo
 */
// dipendenza dagli step dell'applicazione
 import CatCollectionStep        from './controllers/CatCollectionStep.js';
 import CatDetailStep            from './controllers/CatDetailStep.js';
 import CatLookupRaceStep        from './controllers/CatLookupRaceStep.js';
 import HomeStep                 from './controllers/HomeStep.js';
 
// dipendenze dal framework
import FileUpload from '../step-fmw/data-binding/FileUpload.js'
import StepController from '../step-fmw/routing/StepController.js';
import StepLoader from '../step-fmw/routing/StepLoader.js';


// Definisco l'associazione Controller/Etichetta
let stepLoader = new StepLoader();
stepLoader.use('STP.HOME_NOLOG',HomeStep);
stepLoader.use('STP.LST_CAT',CatCollectionStep);
stepLoader.use('STP.VIS_CAT',CatDetailStep);
stepLoader.use('STP.LKP_CAT',CatLookupRaceStep);

// Lettura del backend di Routes.json 
// che associa URL a Etichette
fetch('/static/frontend/web-ui/step-fmw-routes.json')
    .then( (data) => data.json())
    .then(function (routes)  {
        console.log("STARTING APPLICATION");
        window.FileUpload      = FileUpload;
        // START
        new StepController().startListening(routes,stepLoader);
       
    }
    );

    



