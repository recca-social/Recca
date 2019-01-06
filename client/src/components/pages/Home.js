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
        <Header title="Feed"/>
      </div>
    )
  }
};

export default Home;
