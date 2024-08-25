import { useState } from "react";
import "../../style/LoginSignUp/LoginSignUp.css";

function LoginSignUp() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const handleLogin = () => {
    if (!isLoggingIn) {
      setIsLoggingIn(true);
      setSelectedItem("login");
    }
  };

  const handleSignUp = () => {
    if (isLoggingIn) {
      setIsLoggingIn(false);
      setSelectedItem("signup");
    }
  };

  return (
    <div className="login-signUp">
      <div className="loginSignUp-form">
        <div className="mainHeader">QUIZZIE</div>
        <div className="formSelector">
          <div
            onClick={handleSignUp}
            className={selectedItem === "signup" ? "selectedItem" : ""}
          >
            Sign Up
          </div>
          <div
            onClick={handleLogin}
            className={selectedItem === "login" ? "selectedItem" : ""}
          >
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
