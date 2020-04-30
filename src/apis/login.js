import axios from 'axios';
import {serverURL} from "../config";

const LOGIN_URL = `${serverURL}:7000/login`;

export const getUsers = async () => {
  const { data } = await axios.get(LOGIN_URL);
  return data;
};

export const addUser = async (id, pw, userName, birth, location, email, profile) => {
  const { data } = await axios.post(LOGIN_URL, { id, pw, userName, birth, location, email, profile });
  return data;
};
