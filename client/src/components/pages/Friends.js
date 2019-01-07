import React, { Component } from "react";
import Header from "../Header";
import API from "../utils/API";

class Friends extends Component {
  state = {
    search: "",
    bookList: [],
    bookResults: []
  }

  render() {
    return (
      <div>
        {/* <Header title="Friends"/> */}
      </div>
    )
  }
};

export default Friends;
