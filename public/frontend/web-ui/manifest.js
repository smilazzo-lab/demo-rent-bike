import buildMakeUIListener from './ui-listener.js';
import buildMakeUIRendering from './ui-render.js';
import makeStepLoader from '../controllers/manifest.js';


const fileServerURI = '/static/frontend/web-ui/step-fmw-routes.json';

let UIRendeting = buildMakeUIRendering();



//IoT per il rendering
const stepClassLoader =  makeStepLoader({renderer:UIRendeting.renderView, setErrorMsg: UIRendeting.setErrorMsg});
const stepListener = buildMakeUIListener(fileServerURI,stepClassLoader);

const view = Object.freeze({ 
    start: stepListener
});

export default view;