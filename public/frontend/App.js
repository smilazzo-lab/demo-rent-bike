import UI from './web-ui/manifest.js';
import StepLoader from '../step-fmw/routing/StepLoader.js';
import HomeStep from './controllers/HomeStep.js';
import CatDetailStep from './controllers/CatDetailStep.js';
import CatCollectionStep from './controllers/CatCollectionStep.js';
import CatLookupRaceStep from './controllers/CatLookupRaceStep.js';

let stepLoader = new StepLoader();
// injetta in ogni controller (step) il riferimento a UI
let r = UI.renderer;
let s = JSON.stringify(r);

stepLoader.injectUI(r);
// associo ad ogni etichetta una class
stepLoader.use('STP.HOME_NOLOG',HomeStep);
stepLoader.use('STP.LST_CAT',CatCollectionStep);
stepLoader.use('STP.VIS_CAT',CatDetailStep);
stepLoader.use('STP.LKP_CAT',CatLookupRaceStep);

//bisogna associare il validator a CatDetailStep
// il validator lavora a livello di UI!!!!!


UI.eventListener(
    '/static/frontend/web-ui/step-fmw-routes.json',stepLoader);



