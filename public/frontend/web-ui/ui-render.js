import Observable from '../../step-fmw/data-binding/Observable.js';

export default function buildMakeUIRendering () {
    return Object.freeze({
        renderView,
        setErrorMsg
    });

    function setErrorMsg(input,errorMsg) {
        let errorZone =document.querySelector('#'+input).parentElement;
        console.log(errorZone);
        const small = errorZone.querySelector('small');
        console.log("small");
        errorZone.className = 'form-control error';
        small.innerText=errorMsg;
       
    }

     async function renderView({templateType,
                                templateName,
                                templateMetaInfo,
                                templateData,
                                templateBindingZone=null,
                                templateValidator={}}) {
      
             
              document.querySelector('#step-loading').style.visibility='visible';
              let oldOpacity = document.querySelector('#step').style.opacity;
              document.querySelector('#step').style.opacity='0.2';
              document.querySelector('#step-loading').style.opacity='1';
              let url = `http://localhost:3000/launcher/${templateType}/${templateName}`;
              
              getHtmlFromNodeServer(url,templateData,templateMetaInfo)
              .then((html)=> html.text())
              .then(html => {  
                              document.querySelector('#step-loading').style.visibility='hidden';
                              document.querySelector('#step').innerHTML=html;
                              document.querySelector('#step').style.opacity=oldOpacity;
                              if (templateBindingZone!==null) {
                                  // 2 way binding
                                  applyBindings(templateBindingZone,templateValidator);
                                 }
                                
                                 
                                
                            }
                    )
                .catch(err=>{console.log("Problemi di connessione ajax con il server:"+err);
                             document.querySelector('#step').innerHTML= `
                             
                             <h1>Si è verificato un errore nella connessione col server</h1>
                             <p>
                             <img class="avatar-large" alt="io" src="./bike_crash.png" />
                             </p>
                             <p>
                             Dettaglio Errore :[${err}]
                             </p>
                             
                             
                             
                             
                             
                             `;
                             document.querySelector('#step').style.opacity=oldOpacity;
                            
            });
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