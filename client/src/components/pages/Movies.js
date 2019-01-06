import React, { Component } from "react";
import Header from "../Header";
import API from "../utils/API";

class Movies extends Component {
  state = {
    search: "",
    movieList: [],
    movieResults: []
  }

  render() {
    return (
      <div>
        <Header title="Movies"/>
      </div>
    )
  }
};

export default Movies;
