import React, { Component } from "react";
import gameAPI from "../../utils/gameAPI";
import mediaAPI from "../../utils/mediaAPI";
import userAPI from "../../utils/userAPI";
import postAPI from "../../utils/postAPI";
import SearchForm from "../SearchForm";
import Sidebar from "../Sidebar";
import Results from "../Results";
import "./mediaPages.scss";

class Games extends Component {
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
    this.searchGames(this.state.search)
  }

  searchGames = query => {
    const results = [];
    gameAPI.search(query)
      .then(function(res) {
        console.log(res.data)
        res.data.forEach(game => {
          results.push(
            {
              type: "game",
              title: game.title ? game.title : "",
              year: game.releaseYear ? game.releaseYear : "",
              image: game.coverArt ? game.coverArt : "http://placehold.it/128x170",
              description: game.description ? game.description : "No description available",
              link: game.link ? game.link : "",
              genre: game.genre ? game.genre.join(", ") : "",
              platform: game.platforms ? game.platforms.join(", ") : "",
              rating: game.rating ? game.rating : "",
              apiId: game.id
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
    this.getGames();
  }

  handleSave = id => {
    const game = this.state.results.find(game => game.apiId === id);
    this.setState({ search: "", results : [] })
    mediaAPI.create({
      type: "game",
      title: game.title,
      year: game.year,
      image: game.image,
      description: game.description,
      link: game.link,
      genre: game.genre,
      platform: game.platform,
      rating: game.rating,
      apiId: game.apiId
    }).then(() => {
      //Once the game is saved, reset state for results
      this.setState({ results : [] })
      this.getGames()
    })
  }

  getGames = () => {
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
    .then(this.getGames)
    .catch(err => console.log(err))
  }

  toggleActive = id => {
    mediaAPI.toggleActive(id)
    .then(this.getGames)
    .catch(err => console.log(err))
  }

  toggleComplete = id => {
    mediaAPI.toggleComplete(id)
    .then(this.getGames)
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
              mediaType="game"
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
                  mediaType="game"
                  handleSave={this.handleSave}
                  handleRecommend={this.handleRecommend}
                  handleInputChange={this.handleInputChange}
                  postText={this.state.postText}
                />
              </div> : ""}
            <hr />
            {this.state.saved ? 
              <div className="media-wrapper">
                <h2 className="text-center">Saved Games</h2>
                <Results 
                  items={this.state.saved}
                  resultType="saved"
                  mediaType="game"
                  handleDelete={this.handleDelete}
                  toggleActive={this.toggleActive}
                  toggleComplete={this.toggleComplete}
                  handleInputChange={this.handleInputChange}
                  postText={this.state.postText}
                  handleRecommend={this.handleRecommend}
                />
              </div> : 
              <p className="text-center empty-media-msg">Use the search bar above to find and save games!</p> }
          </div>
          
          <Sidebar 
            items={this.state.saved}
            toggleActive={this.toggleActive}
            toggleComplete={this.toggleComplete}
            handleDelete={this.handleDelete}
            mediaType="game"
          />
          </div>
      </div>
    )
  }
};

export default Games;
