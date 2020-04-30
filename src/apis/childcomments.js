import axios from 'axios';
import {serverURL} from "../config";

const CHILDCOMMENTS_URL = `${serverURL}:7000/childcomments`;

export const addChildComment = async (uniqueKey, contents, currentUserID, currentUserName) => {
  const { data } = await axios.post(CHILDCOMMENTS_URL, { uniqueKey, contents, currentUserID, currentUserName });
  return data;
};
