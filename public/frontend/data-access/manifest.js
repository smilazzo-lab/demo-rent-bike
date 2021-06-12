import BookingDaoFactory from './booking-dao.js';
import makePostDao from './booking-dao.js';

const url = 'http://localhost:3000/strapi/';

const backend =  function makeBackend(_url){
   return async function   
       callAPI({_url,uri='/', method='GET',body={}}) {
        const request = {
            method: method, // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body:  JSON.stringify(body)
          };
          return fetch(_url+uri, request); 
       }
   } (url);

const bookingDao = BookingDaoFactory( { backend } );
export default bookingDao;