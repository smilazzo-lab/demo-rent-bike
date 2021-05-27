export default function buildMakePost () {
    return function makePost ({
      author,
      createdOn = Date.now(),
      id,
      title,
      descrizione
     
    } = {}) {
      if (!id) {
        throw new Error('Post must have a valid id.')
      }
      if (!title) {
        throw new Error('Post must have a title.')
      }
      if (!author) {
        throw new Error('Post must have an author.')
      }
      if (author.length < 2) {
        throw new Error("Post author's name must be longer than 2 characters.")
      }
      
      return Object.freeze({
        getAuthor: () => author,
        getCreatedOn: () => createdOn,
        getHash: () => null,
        getId: () => id,
        getTitle: () =>title,
        getDescription: () => descrizione
       
      })
  
      
    }
  }