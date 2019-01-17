import React, { Component } from "react";
import userAPI from "../../utils/userAPI";
import mediaAPI from "../../utils/mediaAPI";
import FeedResults from "../FeedResults";
import Header from "../Header";

class Home extends Component {
  state = {
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

  handleSave = id => {
    const media = this.state.activity.find(media => media.apiId === id);
    mediaAPI.create({
      title: media.title,
      image: media.image,
      description: media.description,
      creator: media.creator,
      type: media.type,
      link: media.link,
      genre: media.genre,
      platform: media.platform,
      year: media.year,
      rating: media.rating,
      apiId: media.apiId
    })
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
            handleSave={this.handleSave}
          />
        </div>
          
        </div>
    );
  }
}

export default Home;
