// dipendenze dal framework
import StepEventListener from '../../step-fmw/routing/StepEventListener.js';
   
export default function buildMakeUIListener () {
  return  async  function startListening(routes,stepLoader){
    loadStepRoutes(routes)
    .then(routes => new StepEventListener().startListening(routes,stepLoader))
  }
  async function  loadStepRoutes (routes) {
   // Definisco l'associazione Controller/Etichetta

     return fetch(routes)
    .then( (data) => data.json());
        
}
}
