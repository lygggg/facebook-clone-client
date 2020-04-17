import axios from 'axios';

const SERVER_URL = 'https://woomin-facebook.herokuapp.com';

// const SESSION_URL = 'https://woominsbook.netlify.app/session';
const SESSION_URL = 'https://woomin-facebook.herokuapp.com/session';
const LOGIN_URL = `${SERVER_URL}/login`;
const POSTS_URL = `${SERVER_URL}/posts`;
const COMMENTS_URL = `${SERVER_URL}/comments`;
const CHILDCOMMENTS_URL = `${SERVER_URL}/childcomments`;
const LIKE_URL = `${SERVER_URL}/like`;
const COMMENTLIKE_URL = `${SERVER_URL}/commentlike`;
const FRIENDS_URL = `${SERVER_URL}/friends`;
const PROFILE_URL = `${SERVER_URL}/profile`;
const UPLOAD_URL = `${SERVER_URL}/upload`;
const SOCKET_URL = `${SERVER_URL}/socket`;

export const getUserSocketID = async (userid) => {
  const { data } = await axios.get(`${SOCKET_URL}/${userid}`);
  return data;
};

export const fileUpload = async (formData) => {
  const { data } = await axios.post(UPLOAD_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const addProfileImage = async (userId, filePath) => {
  const { data } = await axios.patch(PROFILE_URL, { userId, filePath });
  return data;
};

export const checkSessionExist = async () => {
  const { data } = await axios.get(SESSION_URL);
  return data;
};

export const destroySession = async (userID) => {
  const { data } = await axios.patch(SESSION_URL, { userID });
  return data;
};

export const login = async (userID, userPW, socketID) => {
  const { data } = await axios.post(SESSION_URL, { userID, userPW, socketID });
  return data;
};

export const getUsers = async () => {
  const { data } = await axios.get(LOGIN_URL);
  return data;
};

export const addUser = async (id, pw, userName, birth, location, email, profile) => {
  const { data } = await axios.post(LOGIN_URL, { id, pw, userName, birth, location, email, profile });
  return data;
};

export const getPosts = async () => {
  const { data } = await axios.get(POSTS_URL);
  return data;
};

export const addPost = async (id, name, contents, profile, imagePath, time) => {
  const { data } = await axios.post(POSTS_URL, {
    id, name, contents, profile, imagePath, time,
  });
  return data;
};

export const removePost = async (uniqueKey) => {
  const { data } = await axios.delete(`${POSTS_URL}/${uniqueKey}`);
  return data;
};

export const editPost = async (uniqueKey, updatedContents) => {
  const { data } = await axios.patch(POSTS_URL, { uniqueKey, updatedContents });
  return data;
};

export const getComments = async () => {
  const { data } = await axios.get(COMMENTS_URL);
  return data;
};

export const addComment = async (uniqueKey, currentUserID, currentUserName, commentContents) => {
  const { data } = await axios.post(COMMENTS_URL, { uniqueKey, currentUserID, currentUserName, commentContents });
  return data;
};

export const plusCommentCount = async (uniqueKey) => {
  const { data } = await axios.patch(COMMENTS_URL, { uniqueKey });
  return data;
};

export const addChildComment = async (uniqueKey, contents, currentUserID, currentUserName) => {
  const { data } = await axios.post(CHILDCOMMENTS_URL, { uniqueKey, contents, currentUserID, currentUserName });
  return data;
};

export const plusThumbCount = async (uniqueKey, currentUserID) => {
  const { data } = await axios.patch(LIKE_URL, { uniqueKey, currentUserID });
  return data;
};

export const plusCommentThumbCount = async (uniqueKey, currentUserID) => {
  const { data } = await axios.patch(COMMENTLIKE_URL, { uniqueKey, currentUserID });
  return data;
};

export const addFriend = async (currentUserID, friendID) => {
  const { data } = await axios.post(FRIENDS_URL, { currentUserID, friendID });
  return data;
};

export const removeFriend = async (currentUserID, friendID) => {
  const { data } = await axios.patch(FRIENDS_URL, { currentUserID, friendID });
  return data;
};
