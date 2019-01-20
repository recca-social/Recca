import React, { Component } from "react";
import showAPI from "../../utils/showAPI";
import mediaAPI from "../../utils/mediaAPI";
import userAPI from "../../utils/userAPI";
import postAPI from "../../utils/postAPI";
import SearchForm from "../SearchForm";
import Sidebar from "../Sidebar";
import Results from "../Results";
import Footer from "../Footer";
import "./mediaPages.scss";

class Shows extends Component {
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
    this.searchShows(this.state.search)
  }

  searchShows = query => {
    const results = [];
    showAPI.search(query)
      .then(res => {
        // If no results, set state with message
        if (res.data.message) {
          this.setState({ message: res.data.message })
        } else {
          res.data.forEach(show => {
            results.push(
              {
                type: "show",
                title: show.title ? show.title : "",
                year: show.year ? show.year : "",
                image: show.poster && show.poster !== "N/A" ? show.poster : show.poster === "N/A" ? "/images/placehold-img.jpg" : "/images/placehold-img.jpg",
                description: show.summary ? show.summary : "No plot summary available",
                link: show.link ? show.link : "",
                creator: show.writer && show.writer !== "N/A" ? show.writer : show.writer === "N/A" ? "" : "",
                genre: show.genre ? show.genre : "",
                rating: show.rating ? show.rating : "",
                apiId: show.apiId
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
    this.getShows();
    window.scrollTo(0, 0)
  }

  handleSave = id => {
    const show = this.state.results.find(show => show.apiId === id);
    this.setState({ search: "", results : [] })
    mediaAPI.create({
      type: "show",
      title: show.title,
      year: show.year,
      image: show.image,
      description: show.description,
      link: show.link,
      creator: show.creator,
      genre: show.genre,
      rating: show.rating,
      apiId: show.apiId
    }).then((res) => {
      //Once the show is saved, reset state for results
      this.setState({ results : [], message : res.data.message })
      this.getShows()
    })
  }

  getShows = () => {
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
    .then(this.getShows)
    .catch(err => console.log(err))
  }

  toggleActive = id => {
    mediaAPI.toggleActive(id)
    .then(this.getShows)
    .catch(err => console.log(err))
  }

  toggleComplete = id => {
    mediaAPI.toggleComplete(id)
    .then(this.getShows)
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
                mediaType="show"
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
                    mediaType="show"
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
                  <h2 className="text-center header-saved">Saved Shows</h2>
                  <Results 
                    items={this.state.saved}
                    resultType="saved"
                    mediaType="show"
                    handleDelete={this.handleDelete}
                    toggleActive={this.toggleActive}
                    toggleComplete={this.toggleComplete}
                    handleInputChange={this.handleInputChange}
                    postText={this.state.postText}
                    handleRecommend={this.handleRecommend}
                  />
                </div> : 
                <p className="text-center empty-media-msg">Use the search bar above to find and save shows!</p> }
            </div>
            
            <Sidebar 
              items={this.state.saved}
              toggleActive={this.toggleActive}
              toggleComplete={this.toggleComplete}
              handleDelete={this.handleDelete}
              mediaType="show"
            />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
};

export default Shows;
