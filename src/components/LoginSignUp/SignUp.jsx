import React, { useState } from "react";
import "../../style/LoginSignUp/SignUp.css";
import { SignUpUser } from "../../api/User.js";

function SignUp({ handleLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSignUp = async () => {
    const newErrors = {};
    let isValid = true;

    if (!name) {
      newErrors.name = "Invalid name";
      isValid = false;
    }

    if (!email) {
      newErrors.email = "Invalid Email";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Weak password";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Password doesn’t match";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password doesn’t match";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      const errorMessages = Object.values(newErrors).join("\n");
      alert(
        `Please fix the following errors before submitting:\n${errorMessages}`
      );
      return;
    }

    try {
      const response = await SignUpUser(name, email, password);
      if (response.status === 201) {
        alert("Registration successful");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        handleLogin();
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration. Please try again later.");
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
