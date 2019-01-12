import React, { Component } from "react";
// import Header from "../Header";
import userAPI from "../../utils/userAPI";

class Home extends Component {
  state = {
    search: "",
    activity: []
  };

  getFeed = () =>{
    userAPI.getUserFeed()
    .then(function(res) {
      console.log(res.data)
    })
  }

  componentDidMount(){
    this.getFeed()
  }

  render() {
    return (
      <div>
        {/* <Header title="Feed"/> */}
      </div>
    );
  }
}

export default Home;
