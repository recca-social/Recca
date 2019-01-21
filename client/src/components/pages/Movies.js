import React, { Component } from "react";
import movieAPI from "../../utils/movieAPI";
import mediaAPI from "../../utils/mediaAPI";
import userAPI from "../../utils/userAPI";
import postAPI from "../../utils/postAPI";
import SearchForm from "../SearchForm";
import Sidebar from "../Sidebar";
import Results from "../Results";
import Footer from "../Footer";
import "./mediaPages.scss";

class Movies extends Component {
  state = {
    search: "",
    saved: [],
    results: [],
    postText: "",
    message: ""
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
      .then(res => {
        // If no results, set state with message
        if (res.data.message) {
          this.setState({ message: res.data.message })
        } else {
          res.data.forEach(movie => {
            results.push(
              {
                type: "movie",
                title: movie.title ? movie.title : "",
                year: movie.year ? movie.year : "",
                image: movie.poster && movie.poster !== "N/A" ? movie.poster : movie.poster === "N/A" ? "/images/placehold-img.jpg" : "/images/placehold-img.jpg",
                description: movie.summary ? movie.summary : "No plot summary available",
                link: movie.link ? movie.link : "",
                creator: movie.director ? movie.director : "",
                genre: movie.genre ? movie.genre : "",
                rating: movie.rating ? movie.rating : "",
                apiId: movie.apiId
              }
            )
          });
          this.setState({ results: results, message: "" })
        }
      })
      .catch(err => console.log(err));
  };

  clearResults = () => {
    this.setState({results: []})
  }

  componentDidMount() {
    this.getMovies();
    window.scrollTo(0, 0)
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
    }).then((res) => {
      //Once the movie is saved, reset state for results
      this.setState({ results : [], message : res.data.message })
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
    postAPI.post(mediaObj);
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
      <div>
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
                  <h2 className="text-center sr-only">Results</h2>
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
              {this.state.message ? 
                <p className="no-results">{this.state.message}</p> : ""
              }
              <hr />
              {this.state.saved ? 
                <div className="media-wrapper">
                  <h2 className="text-center header-saved">Saved Movies</h2>
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
              handleDelete={this.handleDelete}
              mediaType="movie"
            />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
};

export default Movies;
