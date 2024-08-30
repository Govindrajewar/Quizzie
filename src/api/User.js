import axios from "axios";

const BACKEND_ORIGIN_URL = "http://localhost:4000";

const SignUpUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${BACKEND_ORIGIN_URL}/`, {
      name,
      email,
      password,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export { SignUpUser };
