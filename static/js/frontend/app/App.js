/**
 * @author smilazzo
 */
// dipendenza dagli step dell'applicazione
 import CatCollectionStep        from './steps/CatCollectionStep.js';
 import CatDetailStep            from './steps/CatDetailStep.js';
 import CatLookupRaceStep        from './steps/CatLookupRaceStep.js';
 import HomeStep                 from './steps/HomeStep.js';
 import CatWizardStep            from './steps/CatWizardStep.js';
 import CatWizardLookupStep      from './steps/CatWizardLookupStep.js';
 import NotifyStep               from '../../StepFmw/stepping/NotifyStep.js';
 import ConfirmStep              from  '../../StepFmw/stepping/ConfirmStep.js';

// dipendenze dal framework
import FileUpload from '../../StepFmw/data-binding/FileUpload.js'
import StepEventDispatcher from '../../StepFmw/routing/StepEventDispatcher.js';
import StepLoader from '../../StepFmw/routing/StepLoader.js';


// Definisco l'associazione Controller/Etichetta
let stepLoader = new StepLoader();
stepLoader.use('STP.HOME_NOLOG',HomeStep);
stepLoader.use('STP.LST_CAT',CatCollectionStep);
stepLoader.use('STP.VIS_CAT',CatDetailStep);
stepLoader.use('STP.LKP_CAT',CatLookupRaceStep);

// Lettura del backend di Routes.json 
// che associa URL a Etichette
fetch('/static/js/backend/Routes.json')
    .then( (data) => data.json())
    .then(function (routes)  {
        console.log("STARTING APPLICATION");
        // export di variabili di scripting
        // UTILIZZATA DAL WIDGET DI UPLOAD
        window.FileUpload      = FileUpload;
        // UTILIZZATO PER FAR PARTIRE LA APP
        window.StepLoader = stepLoader;
        window.StepDispatcher = new StepEventDispatcher(routes,stepLoader);
        console.log("creato StepDispatcher in App Scope");
        window.StepDispatcher.startListening();
    }
    );

    



