const fetch = require('node-fetch');

const API = 'https://jsonplaceholder.typicode.com';

async function getPosts() {
  const data = await fetch(`${API}/posts`)
    .then((res) => res.json());
  return data;
}

async function getComments(postId) {
  const escapedPostId = encodeURIComponent(postId);
  const data = await fetch(`${API}/posts/${escapedPostId}/comments`)
    .then((res) => res.json());
  return data;
}

module.exports = {
  getPosts,
  getComments,
};
