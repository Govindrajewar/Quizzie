import axios from "axios";

const BACKEND_ORIGIN_URL = "http://localhost:4000";

const SignUpUser = async (name, email, password, action) => {
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
