import React, { Component } from "react";
import Header from "../Header";
import API from "../utils/API";

class Home extends Component {
  state = {
    search: "",
    activity: []
  }

  render() {
    return (
      <div>
        {/* <Header title="Feed"/> */}
        <a href="/login/facebook">Login with Facebook</a>
      </div>
    )
  }
};

export default Home;
