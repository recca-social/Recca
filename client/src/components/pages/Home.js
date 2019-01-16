import React, { Component } from "react";
// import Header from "../Header";
import userAPI from "../../utils/userAPI";
import FeedResults from "../FeedResults";
import Header from "../Header"

class Home extends Component {
  state = {
    search: "",
    activity: []
  };

  getFeed = () =>{
    let feedPosts = []
    userAPI.getFeedItems()
    .then(function(res) {
      console.log(res.data)
      feedPosts = res.data
    })
    .then(() => this.setState({ activity: feedPosts }))
    .catch(err => console.log(err));
  }

  componentDidMount(){
    this.getFeed()
  }

  render() {
    return (
      <div>
        { <Header title="User Feed"/> }
        <div className="row justify-content-center">
          <FeedResults 
            items={this.state.activity}
          />
        </div>
          
        </div>
    );
  }
}

export default Home;
