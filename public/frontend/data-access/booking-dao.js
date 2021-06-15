export default function BookingDaoFactory ( {backend}) {

  let restBackend= backend;

  async function findAll () {
    // 
     return restBackend.callApi({uri:'/posts'})
     .then(data => data.json());
   

  }

 async  function  findAllProducts() {
    console.log("INside DAO. findAllProducts");
    console.log("restBackend = "+restBackend);
    return restBackend.callAPI({uri:"/services"})
           
           
           //.error(err=>console.log(error));

          
           
  }
    
  async function saveBooking ( dataInfo ) {
    
    return restBackend.callApi({uri:'/bookings',method:'POST',
                        body:{
                              idepost: dataInfo.id,
                              titolo: 'no title',
                              descrizione:'no description',
                              tms_pubblicazione: dataInfo.getCreatedOn()
                       }})
                       .then(data => data.json());
  }

   
  
let dao=  Object.freeze({
  findAll,
  saveBooking,
  findAllProducts

});

return dao;
   
}