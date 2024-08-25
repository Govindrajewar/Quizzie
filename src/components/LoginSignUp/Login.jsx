import React from "react";

function Login() {
  return (
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
  );
}

export default Login;
