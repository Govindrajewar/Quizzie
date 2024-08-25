import React from "react";

function SignUp() {
  return (
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
  );
}

export default SignUp;
