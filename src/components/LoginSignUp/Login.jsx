import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../api/User.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await LoginUser(email, password, "login");
      if (response.status === 200) {
        alert("Login Successful!");

        // TODO: Optionally store the token in localStorage or a context
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        alert(response.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="logIn">
      <div className="inputField">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="inputField">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="submitBtn" onClick={handleLogin}>
        Log in
      </div>
    </div>
  );
}

export default Login;
