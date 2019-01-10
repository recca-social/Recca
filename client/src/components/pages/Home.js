import React, { Component } from "react";
// import Header from "../Header";
// import API from "../utils/API";

class Home extends Component {
  state = {
    search: "",
    activity: []
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
        <div>
          {/* <Header title="Feed"/> */}
        </div>
        <div>
          <a href="/login/facebook">login with facebook</a>
        </div>
=======
        {/* <Header title="Feed"/> */}
        <a href="/login/facebook">Login with Facebook</a>
>>>>>>> master
      </div>
    )
  }
};

export default Home;
