import axios from 'axios';
import {serverURL} from "../config";

const COMMENTS_URL = `${serverURL}:7000/comments`;

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
