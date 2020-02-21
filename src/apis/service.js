import axios from 'axios';

const LOGIN_URL = 'http://localhost:3000/login';
const POSTS_URL = 'http://localhost:3000/posts';

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

export const editPost = async (uniqueKey, temptState) => {
  const { data } = await axios.patch(POSTS_URL, { uniqueKey, temptState });
  return data;
}

export const openEditBox = async (uniqueKey) => {
  const { data } = await axios.patch(POSTS_URL, { uniqueKey });
  return data;
}