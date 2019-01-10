import React, { Component } from "react";
import "./style.css";

class Login extends Component {
  state = {
    user: [],
    username: "",
    password: ""
  };

  render() {
    return (
      <div className="login-form-container" id="login-form">
        <div className="login-form-content">
          <div className="login-form-header">
            <div className="logo">
              <img src="./images/reccoon-lg.png" style={{ height: "100px" }} />
            </div>
            <h3>Recco</h3>
          </div>
          <form method="post" action="" className="login-form">
            <div className="input-container">
              <i className="fas fa-user" />
              <input
                type="email"
                className="input"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="input-container">
              <i className="fas fa-lock" />
              <input
                type="password"
                id="login-password"
                className="input"
                name="password"
                placeholder="Password"
              />
              {/* <i id="show-password" className="fa fa-eye" /> */}
            </div>
            {/* <div className="rememberme-container">
              <input type="checkbox" name="rememberme" id="rememberme" />
              <label for="rememberme" className="rememberme">
                <span>Remember me</span>
              </label>
              <a className="forgot-password" href="/">
                Forgot Password?
              </a>
            </div> */}
            <input
              type="submit"
              name="login"
              value="Login"
              className="button"
            />
            <a href="/" className="register">
              Register
            </a>
          </form>
          <div className="separator">
            <span className="separator-text">OR</span>
          </div>
          <div className="socmed-login">
            <a href="www.facebook.com" className="socmed-btn facebook-btn">
              <i className="fab fa-facebook-square" />
              <span>Login with Facebook</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;