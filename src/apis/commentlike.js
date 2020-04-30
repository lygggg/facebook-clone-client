import axios from 'axios';
import {serverURL} from "../config";

const COMMENTLIKE_URL = `${serverURL}:7000/commentlike`;

export const plusCommentThumbCount = async (uniqueKey, currentUserID) => {
  const { data } = await axios.patch(COMMENTLIKE_URL, { uniqueKey, currentUserID });
  return data;
};
