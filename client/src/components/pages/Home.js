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
        <div>
          {/* <Header title="Feed"/> */}
        </div>
        <div>
          <a href="/login/facebook">login with facebook</a>
        </div>
      </div>
    )
  }
};

export default Home;
