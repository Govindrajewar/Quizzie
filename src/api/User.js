import axios from "axios";
import { BACKEND_URL } from "../Links.js";

const SignUpUser = async (name, email, password, action) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/`, {
      name,
      email,
      password,
      action,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

const LoginUser = async (email, password, action) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/`, {
      email,
      password,
      action,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export { SignUpUser, LoginUser };
