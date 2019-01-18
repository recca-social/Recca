import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import userAPI from "../../utils/userAPI";
import Footer from "../Footer";
import "./style.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
      isLoggedIn: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  componentDidMount() {
    this.setState({
      isLoggedIn: userAPI.isLoggedIn()
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    userAPI.localLogIn(this.state.username, this.state.password)
      .then(response => {
        console.log(response);
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
    if (this.state.isLoggedIn === true) {
      console.log(this.state.isLoggedIn)
      return <Redirect to="/home" />
    }
    return (
      <div>
        <div className="login-form-container" id="login-form">
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

        <Footer />
      </div>

    );
  }
}


export default Login;
