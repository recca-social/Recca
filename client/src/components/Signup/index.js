import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer";
import "./style.scss";

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
      isLoggedIn: false,
      message: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    console.log("we clicked the signup button")
    event.preventDefault();
    axios
      .post("/login/signup", {
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      })
      .then(response => {
        console.log(response)
        if (response.data.user) {
          console.log("Successful sign-up!");
          this.setState({
            isLoggedIn: true
          });
        } else {
          console.log("Username already taken!");
          this.setState({message: response.data.message})
        }
      })
      .catch(error => {
        console.log("Sign-up server error: " + error);
      });
  };

  render() {
    return (
      <div>
        <div className="login-wrapper">
          {!this.state.isLoggedIn ? (
            <div className="login-block">
              <div className="login-form-content">
                <div className="login-form-header">
                  <div className="logo">
                    <img
                      src="/images/recca-logo.png"
                      alt="recca the raccoon"
                      style={{ height: "180px" }}
                    />
                  </div>
                  <h1 className="sr-only">Recca</h1>
                </div>
                {this.state.message.length > 0 ? <p className="warning">{this.state.message}</p>: ""}
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
                    <span className="fas fa-user" />
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
                    <span className="fas fa-lock" />
                    <input
                      type="password"
                      className="input"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </div>
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
                  <Link to="/login/facebook" className="socmed-btn facebook-btn">
                    <i className="fab fa-facebook-square" />
                    <span>Login with Facebook</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <Redirect to="/home" />
          )}
        </div>
        <Footer loginPage={true} />
      </div>
    );
  }
}

export default Signup;
