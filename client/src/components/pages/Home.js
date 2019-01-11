import React, { Component } from "react";
// import Header from "../Header";
// import API from "../utils/API";

class Home extends Component {
  state = {
    search: "",
    activity: []
  };

  render() {
    return (
      <div>
        {/* <Header title="Feed"/> */}
        <a href="/login/facebook">Login with Facebook</a>
        <form action="/login/local" method="post">
          <div>
            <label>Username:</label>
            <input type="text" name="username" />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" />
          </div>
          <div>
            <input type="submit" value="Log In" />
          </div>
        </form>
      </div>
    );
  }
}

export default Home;
