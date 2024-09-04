import axios from "axios";

import BACKEND_ORIGIN_URL from "../links"

const SignUpUser = async (name, email, password, action) => {
  console.log("BACKEND_ORIGIN_URL"+BACKEND_ORIGIN_URL);
  try {
    const response = await axios.post(`${BACKEND_ORIGIN_URL}/`, {
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
    const response = await axios.post(`${BACKEND_ORIGIN_URL}/`, {
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
