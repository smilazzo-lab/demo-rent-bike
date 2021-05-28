import Observable from '../../step-fmw/data-binding/Observable.js';

export default function buildMakeUIRendering () {

    return function renderView({templateType,
                                templateName,
                                templateMetaInfo,
                                templateData,
                                templateBindingZone=null,
                                templateValidator={}}) {
      
              document.querySelector('#step').innerHTML='<div id="loader" class="loader"></div>';
              
              let url = `http://localhost:3000/launcher/${templateType}/${templateName}`;
              
              getHtmlFromNodeServer(url,templateData,templateMetaInfo)
              .then((html)=> html.text())
              .then(html => {  document.querySelector('#step').innerHTML=html;
                              if (templateBindingZone!==null) {
                                  // 2 way binding
                                  applyBindings(templateBindingZone,templateValidator);
                                 }
                            }
                    );
    }

    function applyBindings(model,validator){
        document.querySelectorAll("[data-bind]").forEach(elem => {
            let obs = model[elem.getAttribute("data-bind")];
            if (obs instanceof Observable){
                 obs = new Observable(obs.value);
             }else{
                 obs = new Observable(obs);
             }
             model[elem.getAttribute("data-bind")]=obs;
             obs.bindToHtmlElement(elem,validator);
            });
    }

   
    async function getHtmlFromNodeServer (templateUrl,templateData,metaInfo) {
            let t = JSON.parse(templateData);
            t.meta = metaInfo;
    
            const postData = {
               method: 'POST', // *GET, POST, PUT, DELETE, etc.
               mode: 'cors', // no-cors, *cors, same-origin
               cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
               credentials: 'same-origin', // include, *same-origin, omit
               headers: {
                 'Content-Type': 'application/json'
               },
               redirect: 'follow', // manual, *follow, error
               referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
               body:  JSON.stringify(t)
             };
             return fetch(templateUrl, postData); 
        }
    }