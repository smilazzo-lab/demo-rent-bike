export default function BookingDaoFactory ( {backend}) {
 
return Object.freeze({
    findAll,
    saveBooking,
  
  })

  async function findAll () {
    // 
     return backend.callApi({uri:'/posts'})
     .then(data => data.json());
   

  }
    
  async function saveBooking ( dataInfo ) {
    
    return backend.callApi({uri:'/bookings',method:'POST',
                        body:{
                              idepost: dataInfo.id,
                              titolo: 'no title',
                              descrizione:'no description',
                              tms_pubblicazione: dataInfo.getCreatedOn()
                       }})
                       .then(data => data.json());
  }

   
}