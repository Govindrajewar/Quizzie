import axios from "axios";

const SignUpUser = async (name, email, password, action) => {
  try {
    const response = await axios.post(
      `https://quizzie-server-0461.onrender.com/`,
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
      `https://quizzie-server-0461.onrender.com/`,
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
