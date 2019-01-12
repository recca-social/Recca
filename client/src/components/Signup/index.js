import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./style.css";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
      isLoggedIn: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post("/login/signup", {
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      })
      .then(response => {
        console.log(response);
        if (response.data) {
          console.log("response from signup: " + response.data);
          this.setState({
            isLoggedIn: true
            // username: response.data.username
          });
        } else {
          console.log("username already taken");
        }
      })
      .catch(error => {
        console.log("Sign-up server error: " + error);
      });
  }

  render() {
    return (
      <div>
        {!this.state.isLoggedIn ?
          <div className="login-form-container" id="login-form">
            <div className="login-form-content">
              <div className="login-form-header">
                <div className="logo">
                  <img
                    src="./images/reccoon-lg.png"
                    alt="recco"
                    style={{ height: "100px" }}
                  />
                </div>
                <h3>Recco</h3>
              </div>
              <form method="post" action="/login/signup" className="login-form">
                <div className="input-container first-name">
                  <input
                    type="text"
                    className="input"
                    name="firstName"
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-container last-name">
                  <input
                    type="text"
                    className="input"
                    name="lastName"
                    placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-container">
                  <i className="fas fa-user" />
                  <input
                    type="text"
                    className="input"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-container">
                  <i className="fas fa-lock" />
                  <input
                    type="password"
                    className="input"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
                {/* <a href="/" className="register">
                  Create Account
                </a> */}
                <input
                  className="register"
                  value="Sign Up"
                  onClick={this.handleSubmit}
                  type="submit"
                />
              </form>
              <div className="separator">
                <span className="separator-text">OR</span>
              </div>
              <div className="socmed-login">
                <a href="/login/facebook" className="socmed-btn facebook-btn">
                  <i className="fab fa-facebook-square" />
                  <span>Login with Facebook</span>
                </a>
              </div>
            </div>
            <p>
              Back to <a href="/login">Login</a>
            </p>
          </div>
        : <Redirect to="/home" /> }
      </div>
    );
  }
}

export default Signup;
