export default function makePostDao ( {backend}) {
 
return Object.freeze({
    findAll,
    addPost,
  
  })

  async function findAll () {
    // 
     return backend.callApi({uri:'/posts'})
     .then(data => data.json());
   

  }
    
  async function addPost ( dataInfo ) {
    
    return backend.callApi({uri:'/posts',method:'POST',
                        body:{
                              idepost: dataInfo.id,
                              titolo: 'no title',
                              descrizione:'no description',
                              tms_pubblicazione: dataInfo.getCreatedOn()
                       }})
                       .then(data => data.json());
  }

   
}