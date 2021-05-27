import daoPost from '../data-access/index.js'
import makeListPosts from './list-posts.js'
import makeCreatePost from './create-post.js';

const listAllPostsUC = makeListPosts({ daoPost });
const createPostUC = makeCreatePost({daoPost});

const postUCs = Object.freeze({
    createPostUC,
    listAllPostsUC
});

export default postUCs;