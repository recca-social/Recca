import React, { Component } from "react";
import Header from "../Header";
import API from "../utils/API";

class Games extends Component {
  state = {
    search: "",
    gameList: [],
    gameResults: []
  }

  render() {
    return (
      <div>
        {/* <Header title="Games"/> */}
      </div>
    )
  }
};

export default Games;
