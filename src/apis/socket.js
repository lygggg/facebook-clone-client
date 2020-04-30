import axios from 'axios';
import {serverURL} from "../config";

const SOCKET_URL = `${serverURL}:7000/socket`;

export const getUserSocketID = async (userid) => {
  const { data } = await axios.get(`${SOCKET_URL}/${userid}`);
  return data;
};
