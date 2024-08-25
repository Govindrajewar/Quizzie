import { useState } from "react";
import "../../style/LoginSignUp/LoginSignUp.css";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";

function LoginSignUp() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = () => {
    document.getElementById("signUpId").classList.remove("selectedItem");
    document.getElementById("loginId").classList.add("selectedItem");

    if (!isLoggingIn) {
      setIsLoggingIn(true);
    }
  };

  const handleSignUp = () => {
    document.getElementById("loginId").classList.remove("selectedItem");
    document.getElementById("signUpId").classList.add("selectedItem");

    if (isLoggingIn) {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="login-signUp">
      <div className="loginSignUp-form">
        <div className="mainHeader">QUIZZIE</div>
        <div className="formSelector">
          <div id="signUpId" onClick={handleSignUp} className="selectedItem">
            Sign Up
          </div>
          <div id="loginId" onClick={handleLogin}>
            Log In
          </div>
        </div>

        {isLoggingIn ? <Login /> : <SignUp />}
      </div>
    </div>
  );
}

export default LoginSignUp;
