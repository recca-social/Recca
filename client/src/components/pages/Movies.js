import React, { Component } from "react";
import movieAPI from "../../utils/movieAPI";
import mediaAPI from "../../utils/mediaAPI";
import userAPI from "../../utils/userAPI";
import SearchForm from "../SearchForm";
import Sidebar from "../Sidebar";
import Results from "../Results";
import "./mediaPages.scss";

class Movies extends Component {
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
    this.searchMovies(this.state.search)
  }

  searchMovies = query => {
    const results = [];
    movieAPI.search(query)
      .then(function(res) {
        res.data.forEach(movie => {
          results.push(
            {
              type: "movie",
              title: movie.title ? movie.title : "",
              year: movie.year ? movie.year : "",
              image: movie.poster && movie.poster !== "N/A" ? movie.poster : movie.poster === "N/A" ? "http://placehold.it/128x170" : "http://placehold.it/128x170",
              description: movie.summary ? movie.summary : "No plot summary available",
              link: movie.link ? movie.link : "",
              creator: movie.director ? movie.director : "",
              genre: movie.genre ? movie.genre : "",
              rating: movie.rating ? movie.rating : "",
              apiId: movie.apiId
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
    this.getMovies();
  }

  handleSave = id => {
    const movie = this.state.results.find(movie => movie.apiId === id);
    this.setState({ search: "", results : [] })
    mediaAPI.create({
      type: "movie",
      title: movie.title,
      year: movie.year,
      image: movie.image,
      description: movie.description,
      link: movie.link,
      creator: movie.creator,
      genre: movie.genre,
      rating: movie.rating,
      apiId: movie.apiId
    }).then(() => {
      //Once the movie is saved, reset state for results
      this.setState({ results : [] })
      this.getMovies()
    })
  }

  getMovies = () => {
    userAPI.getUserMedia()
    .then((res) => {
      this.setState({ saved: res.data.media });
    })
    .catch(err => console.log(err));
  }

  handleRecommend = mediaObj => {
    mediaObj.postText = this.state.postText;
    console.log(mediaObj)
    this.setState({postText: ""})
    // set recommended = true if the mediaObj came from the user's list
    // send recommendation to user's friends
  }

  handleDelete = id => {
    mediaAPI.delete(id)
    .then(this.getMovies)
    .catch(err => console.log(err))
  }

  toggleActive = id => {
    mediaAPI.toggleActive(id)
    .then(this.getMovies)
    .catch(err => console.log(err))
  }

  toggleComplete = id => {
    mediaAPI.toggleComplete(id)
    .then(this.getMovies)
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
              mediaType="movie"
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
                  mediaType="movie"
                  handleSave={this.handleSave}
                  handleRecommend={this.handleRecommend}
                  handleInputChange={this.handleInputChange}
                  postText={this.state.postText}
                />
              </div> : ""}
            <hr />
            {this.state.saved ? 
              <div className="media-wrapper">
                <h2 className="text-center">Saved Movies</h2>
                <Results 
                  items={this.state.saved}
                  resultType="saved"
                  mediaType="movie"
                  handleDelete={this.handleDelete}
                  toggleActive={this.toggleActive}
                  toggleComplete={this.toggleComplete}
                  handleInputChange={this.handleInputChange}
                  postText={this.state.postText}
                  handleRecommend={this.handleRecommend}
                />
              </div> : 
              <p className="text-center empty-media-msg">Use the search bar above to find and save movies!</p> }
          </div>
          
          <Sidebar 
            items={this.state.saved}
            toggleActive={this.toggleActive}
            toggleComplete={this.toggleComplete}
            mediaType="movie"
          />
          </div>
      </div>
    )
  }
};

export default Movies;
