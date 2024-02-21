import React from "react";
import "./CSS/LoginSignup.css";
const LoginSignup = () => {
  return (
    <div className="loginSignup">
      <div className="loginSignup-container">
        <h1>Sign Up</h1>

        <form action="">
          <div className="loginSignup-fields">
            <input type="text" name="name" id="name" placeholder="Your Name" />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
            />
            <input
              type="password"
              name="email"
              id="password"
              placeholder="Password"
            />
          </div>
          <button type="submit">Continue</button>
        </form>
        <p className="loginSignup-login">Already have an account? <span>Login here.</span></p>
      </div>
    </div>
  );
};

export default LoginSignup;
