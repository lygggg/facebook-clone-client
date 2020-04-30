import axios from 'axios';
import {serverURL} from "../config";

const FRIENDS_URL = `${serverURL}:7000/friends`;

export const addFriend = async (currentUserID, friendID) => {
  const { data } = await axios.post(FRIENDS_URL, { currentUserID, friendID });
  return data;
};

export const removeFriend = async (currentUserID, friendID) => {
  const { data } = await axios.patch(FRIENDS_URL, { currentUserID, friendID });
  return data;
};
