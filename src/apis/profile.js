import axios from 'axios';
import {serverURL} from "../config";

const PROFILE_URL = `${serverURL}:7000/profile`;

export const addProfileImage = async (userId, filePath) => {
  const { data } = await axios.patch(PROFILE_URL, { userId, filePath });
  return data;
};
