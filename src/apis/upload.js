import axios from 'axios';
import {serverURL} from "../config";

const UPLOAD_URL = `${serverURL}:7000/upload`;

export const fileUpload = async (formData) => {
  const { data } = await axios.post(UPLOAD_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
