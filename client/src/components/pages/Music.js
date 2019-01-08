import React, { Component } from "react";
import Header from "../Header";
import musicAPI from "../../utils/musicAPI";

class Music extends Component {
  state = {
    search: "",
    musicList: [],
    musicResults: []
  }
  
  render() {
    return (
      <div>
        {/* <Header title="Music"/> */}
      </div>
    )
  }
};

export default Music;
