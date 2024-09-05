import axios from "axios";

const SignUpUser = async (name, email, password, action) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/`,
      {
        name,
        email,
        password,
        action,
      }
    );
    console.log(response.data);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

const LoginUser = async (email, password, action) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/`,
      {
        email,
        password,
        action,
      }
    );
    console.log(response.data);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export { SignUpUser, LoginUser };
