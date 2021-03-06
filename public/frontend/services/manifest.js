import BookingServiceSingleton from './booking-service.js'



const _url = 'http://localhost:1337';

 function makeBackend(_url){
   console.log("making backend..");
   let baseUrl = _url;
   return Object.freeze( { callAPI : async function ({_url,uri='/', method='GET',body={}}) {
     console.log("uri="+uri);
                                        const request4post = {
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

                                          const request4get = {
                                            method: method, // *GET, POST, PUT, DELETE, etc.
                                            mode: 'cors', // no-cors, *cors, same-origin
                                            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                            credentials: 'same-origin', // include, *same-origin, omit
                                            headers: {
                                              'Content-Type': 'application/json',
                                              'Authorization' :'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMTU0ODMwLCJleHAiOjE2MjU3NDY4MzB9.E7-sWnrQPr-VsR-HnKpbbpU_SR5_6-uZjfL99qc-u6o'
                                            },
                                            redirect: 'follow', // manual, *follow, error
                                            referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                                            
                                          };

                                          console.log("requesting "+baseUrl+uri+ " with "+JSON.stringify(request4get));
                                         
                                        return fetch(baseUrl+uri, request4get); 
                                       // return fetch('http://localhost:1337/services', request4get); 
                                       }
                           });
                   }
   
const restBackend =makeBackend(_url);



console.log("BUILDING SERVICE DAO!!");
console.log("backend = "+JSON.stringify(restBackend));
const BookingService = BookingServiceSingleton({restBackend});


export default BookingService;