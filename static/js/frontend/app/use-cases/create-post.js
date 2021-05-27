// import top-down 
import makePostEntity from '../entities/index.js';
// dependency injection
export default function makeCreatePost ({ daoPost }) {
    return async function addPost() {
      // creazione dell'entità
      let post= makePostEntity();
      return daoPost.addPost( {
                                  author: post.getAuthor(),
                                  createdAt: post.getCreatedOn(),
                                  id: post.getId()
      })
     
    }
}