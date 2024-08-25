import { useState } from "react";
import "../../style/LoginSignUp/LoginSignUp.css";

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

        {isLoggingIn ? (
          <div className="logIn">
            <div className="inputField">
              <label htmlFor="">Email</label>
              <input type="email" />
            </div>
            <div className="inputField">
              <label htmlFor="">Password</label>
              <input type="password" />
            </div>
            <div className="submitBtn">Log in</div>
          </div>
        ) : (
          <div className="signUp">
            <div className="inputField">
              <label htmlFor="">Name</label>
              <input type="text" />
            </div>
            <div className="inputField">
              <label htmlFor="">Email</label>
              <input type="email" />
            </div>
            <div className="inputField">
              <label htmlFor="">Password</label>
              <input type="password" />
            </div>
            <div className="inputField">
              <label htmlFor="">Confirm Password</label>
              <input type="password" />
            </div>
            <div className="submitBtn">Sign-Up</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginSignUp;
