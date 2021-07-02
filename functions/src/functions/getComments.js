const exampleAPI = require('@/shared/exampleAPI');

module.exports = async function getComments({ postId }) {
  const comments = await exampleAPI.getComments(postId);
  return {
    comments,
  };
};
