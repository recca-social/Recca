import React, { Component } from "react";
import userAPI from "../../utils/userAPI";
import mediaAPI from "../../utils/mediaAPI";
import FeedResults from "../FeedResults";
import Header from "../Header";
import Footer from "../Footer";
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
    .then( (res)=>{
      if(res.data.message){
        console.log(res.data)
      } else {
        let newPage = media.type
        if (newPage !== "music"){
        newPage += "s"
      }
    
        this.setState({
        redirectTo: newPage,
        itemSaved: true
      })
      }
      
    }
 )
  }

  componentDidMount(){
    this.getFeed();
    window.scrollTo(0, 0)
  }

  render() {
    if ( this.state.itemSaved === true){
      this.setState({
        itemSaved: false
      })
      return <Redirect to={"/" + this.state.redirectTo} />
    }
    return (
      <div>
        { <Header title="User Feed"/> }
        <div className="row justify-content-center feed">
          <FeedResults 
            items={this.state.activity}
            handleSave={this.handleSave}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
