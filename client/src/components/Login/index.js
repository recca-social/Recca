import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import API from "../../utils/userAPI";
import "./style.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      message: "",
      isLoggedIn: false
    };
    this.pageChange = this.pageChange.bind(this);
    this.isUser = this.isUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  isUser = () => {
    API.isLoggedIn()
      .then(res => {
        if (res.data.isLoggedIn === true) {
          this.setState({
            isLoggedIn: true
          });
        } else {
          this.setState({
            isLoggedIn: false
          });
        }
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.isUser();
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  pageChange = event => {};

  handleSubmit = event => {
    event.preventDefault();
    API.localLogIn(this.state.username, this.state.password)
      .then(response => {
        if (response.data.user) {
          // Update App.js state
          this.setState({
            isLoggedIn: true
          });
        } else {
          this.setState({
            message: response.data.message
          });
        }
      })
      .catch(error => {
        console.log("Login error: " + error);
      });
  };

  render() {
    return (
      <div>
        {!this.state.isLoggedIn ? (
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
              <form method="post" action="/login/local" className="login-form">
                <div className="input-container">
                  <span className="fas fa-user" />
                  <input
                    type="text"
                    className="username"
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
                    className="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
                <input
                  type="submit"
                  name="login"
                  value="Log In"
                  className="submit-btn"
                  onClick={this.handleSubmit}
                />
                <Link to="/signup" className="create-btn">
                  Create Account
                </Link>
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
    );
  }
}

export default Login;
