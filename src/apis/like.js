import axios from 'axios';
import {serverURL} from "../config";

const LIKE_URL = `${serverURL}:7000/like`;

export const plusThumbCount = async (uniqueKey, currentUserID) => {
  const { data } = await axios.patch(LIKE_URL, { uniqueKey, currentUserID });
  return data;
};
