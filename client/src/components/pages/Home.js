import React, { Component } from "react";
import userAPI from "../../utils/userAPI";
import mediaAPI from "../../utils/mediaAPI";
import FeedResults from "../FeedResults";
import Header from "../Header";
import { Redirect } from "react-router-dom";

class Home extends Component {
  state = {
    itemSaved: false,
    redirectTo: "",
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
    .then( ()=>{
      let newPage = media.type
      if (newPage !== "music"){
        newPage += "s"
      }
    
      this.setState({
        redirectTo: newPage,
        itemSaved: true
      })
    }
 )
  }

  componentDidMount(){
    this.getFeed()
  }

  render() {
    if ( this.state.itemSaved === true){
      {this.setState({
        itemSaved: false
      })}
      return <Redirect to={"/" + this.state.redirectTo} />
    }
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
