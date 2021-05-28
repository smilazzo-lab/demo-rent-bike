import buildMakeUIListener from './ui-listener.js';
import buildMakeUIRendering from './ui-render.js';

const eventListener = buildMakeUIListener();
const renderer  = buildMakeUIRendering();

let UI = Object.freeze({
    eventListener,
    renderer
});

export default UI;