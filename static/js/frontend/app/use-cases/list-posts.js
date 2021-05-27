export default function makeListPosts ({ daoPost }) {
    
    return async function listPosts() {
      const allPosts = await daoPost.findAll();
      return allPosts;
    }
}