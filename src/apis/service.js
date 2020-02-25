import axios from 'axios';

const LOGIN_URL = 'http://localhost:3000/login';
const POSTS_URL = 'http://localhost:3000/posts';
const SCRAPS_URL = 'http://localhost:3000/scraps';
const COMMENTS_URL = 'http://localhost:3000/comments';
const CHILDCOMMENTS_URL = 'http://localhost:3000/childcomments';
const LIKE_URL = 'http://localhost:3000/like';
const COMMENTLIKE_URL = 'http://localhost:3000/commentlike';

export const getUsers = async () => {
  const { data } = await axios.get(LOGIN_URL);
  return data;
};

export const addUser = async (id, pw, userName) => {
  const { data } = await axios.post(LOGIN_URL, { id, pw, userName });
  return data;
}

export const getPosts = async () => {
  const { data } = await axios.get(POSTS_URL);
  return data;
}

export const addPost = async (id, name, contents) => {
  const { data } = await axios.post(POSTS_URL, { id, name, contents });
  return data;
}

export const removePost = async (uniqueKey) => {
  const { data } = await axios.delete(`${POSTS_URL}/${uniqueKey}`);
  return data;
}

export const editPost = async (uniqueKey, updatedContents) => {
  const { data } = await axios.patch(POSTS_URL, { uniqueKey, updatedContents });
  return data;
}

export const addScrap = async (whoScrapedByID, whoScrapedByName, whoWritePostByName, ScrapedPostContents, uniqueKey) => {
  const { data } = await axios.post(SCRAPS_URL, { whoScrapedByID, whoScrapedByName, whoWritePostByName, ScrapedPostContents, uniqueKey });
  return data;
}

export const getComments = async () => {
  const { data } = await axios.get(COMMENTS_URL);
  return data;
}

export const addComment = async (uniqueKey, currentUserID, currentUserName, commentContents) => {
  const { data } = await axios.post(COMMENTS_URL, { uniqueKey, currentUserID, currentUserName, commentContents });
  return data;
}

export const plusCommentCount = async (uniqueKey) => {
  const { data } = await axios.patch(COMMENTS_URL, { uniqueKey });
  return data;
}

export const addChildComment = async (uniqueKey, contents, currentUserID, currentUserName) => {
  const { data } = await axios.post(CHILDCOMMENTS_URL, { uniqueKey, contents, currentUserID, currentUserName });
  return data;
}

export const plusThumbCount = async (uniqueKey, currentUserID) => {
  const { data } = await axios.patch(LIKE_URL, { uniqueKey, currentUserID });
  return data;
}

export const plusCommentThumbCount = async (uniqueKey, currentUserID) => {
  const { data } = await axios.patch(COMMENTLIKE_URL, { uniqueKey, currentUserID });
  return data;
}
