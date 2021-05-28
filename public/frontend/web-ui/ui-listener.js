// dipendenze dal framework
import StepEventListener from '../../step-fmw/routing/StepEventListener.js';
   
export default function buildMakeUIListener (jsonroutesUri,stepLoader) {
  // la APP deve invocare il metodo startListening per
  // avviare l'engine MVC!
  return  async  function (){
    loadStepRoutes(jsonroutesUri)
    .then(routes => new StepEventListener().startListening(routes,stepLoader))
  }

  async function  loadStepRoutes (routes) {
     return fetch(routes)
    .then( (data) =>  data.json());
        
}
}
