const exampleAPI = require('@/shared/exampleAPI');

module.exports = async function getPosts() {
  const posts = await exampleAPI.getPosts();
  return {
    posts,
  };
};
