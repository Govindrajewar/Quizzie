import React, { useState } from "react";
import "../../style/LoginSignUp/SignUp.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSignUp = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Invalid name";
    if (!email) {
      newErrors.email = "Invalid Email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      alert("Email is invalid");
    }
    if (!password) newErrors.password = "Weak password";
    if (!confirmPassword) newErrors.confirmPassword = "Password doesn’t match";
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password doesn’t match";
      alert("Password doesn’t match");
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const userData = { name, email, password };

      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = existingUsers.some((user) => user.email === email);

      if (userExists) {
        alert("User already exists");
        return;
      }

      existingUsers.push(userData);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      alert("Signed Up Successfully");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="signUp">
      <div className="inputField">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={errors.name ? "error" : ""}
          placeholder={errors.name ? errors.name : ""}
        />
      </div>
      <div className="inputField">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? "error" : ""}
          placeholder={errors.email ? errors.email : ""}
        />
      </div>
      <div className="inputField">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={errors.password ? "error" : ""}
          placeholder={errors.password ? errors.password : ""}
        />
      </div>
      <div className="inputField">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={errors.confirmPassword ? "error" : ""}
          placeholder={errors.confirmPassword ? errors.confirmPassword : ""}
        />
      </div>
      <div className="submitBtn" onClick={handleSignUp}>
        Sign-Up
      </div>
    </div>
  );
}

export default SignUp;
