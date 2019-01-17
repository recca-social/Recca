import React, { Component } from "react";
import musicAPI from "../../utils/musicAPI";
import mediaAPI from "../../utils/mediaAPI";
import userAPI from "../../utils/userAPI";
import postAPI from "../../utils/postAPI";
import SearchForm from "../SearchForm";
import Sidebar from "../Sidebar";
import Results from "../Results";
import "./mediaPages.scss";

class Music extends Component {
  state = {
    search: "",
    saved: [],
    results: [],
    postText: ""
  }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleSearch = event => {
    event.preventDefault();
    this.searchMusic(this.state.search)
  }

  searchMusic = query => {
    const results = [];
    musicAPI.searchAlbum(query)
      .then(function(res) {
        console.log(res.data)
        res.data.forEach(music => {
          results.push(
            {
              type: "music",
              title: music.albumName ? music.albumName : "",
              image: music.image ? music.image : "http://placehold.it/128x128",
              link: music.albumLink.spotify ? music.albumLink.spotify : "",
              creator: music.artist ? music.artist.join(", ") : "",
              apiId: music.apiId
            }
          )
        });
      })
      .then(() => this.setState({ results }))
      .catch(err => console.log(err));
  };

  clearResults = () => {
    this.setState({results: []})
  }

  componentDidMount() {
    this.getMusic();
  }

  handleSave = id => {
    const music = this.state.results.find(music => music.apiId === id);
    this.setState({ search: "", results : [] })
    mediaAPI.create({
      type: "music",
      title: music.title,
      image: music.image,
      link: music.link,
      creator: music.creator,
      apiId: music.apiId
    }).then(() => {
      //Once the music is saved, reset state for results
      this.setState({ results : [] })
      this.getMusic()
    })
  }

  getMusic = () => {
    userAPI.getUserMedia()
    .then((res) => {
      this.setState({ saved: res.data.media });
    })
    .catch(err => console.log(err));
  }

  handleRecommend = mediaObj => {
    mediaObj.postText = this.state.postText;
    postAPI.post(mediaObj);
    this.setState({postText: ""})
    // set recommended = true if the mediaObj came from the user's list
    // send recommendation to user's friends
  }

  handleDelete = id => {
    mediaAPI.delete(id)
    .then(this.getMusic)
    .catch(err => console.log(err))
  }

  toggleActive = id => {
    mediaAPI.toggleActive(id)
    .then(this.getMusic)
    .catch(err => console.log(err))
  }

  toggleComplete = id => {
    mediaAPI.toggleComplete(id)
    .then(this.getMusic)
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9 main">
            <SearchForm 
              search={this.state.search}
              handleInputChange={this.handleInputChange}
              handleSearch={this.handleSearch}
              mediaType="music"
            />
            {this.state.results.length ? 
              <div className="media-wrapper">
                <h2 className="text-center">Results</h2>
                <button onClick={this.clearResults} className="btn-clear">Clear <i className="icon icon-collapse"></i></button>
                <div className="clearfix"></div>
                <Results 
                  items={this.state.results}
                  clearResults={this.clearResults}
                  resultType="results"
                  mediaType="music"
                  handleSave={this.handleSave}
                  handleRecommend={this.handleRecommend}
                  handleInputChange={this.handleInputChange}
                  postText={this.state.postText}
                />
              </div> : ""}
            <hr />
            {this.state.saved ? 
              <div className="media-wrapper">
                <h2 className="text-center">Saved Music</h2>
                <Results 
                  items={this.state.saved}
                  resultType="saved"
                  mediaType="music"
                  handleDelete={this.handleDelete}
                  toggleActive={this.toggleActive}
                  toggleComplete={this.toggleComplete}
                  handleInputChange={this.handleInputChange}
                  postText={this.state.postText}
                  handleRecommend={this.handleRecommend}
                />
              </div> : 
              <p className="text-center empty-media-msg">Use the search bar above to find and save music!</p> }
          </div>
          
          <Sidebar 
            items={this.state.saved}
            toggleActive={this.toggleActive}
            toggleComplete={this.toggleComplete}
            handleDelete={this.handleDelete}
            mediaType="music"
          />
          </div>
      </div>
    )
  }
};

export default Music;
