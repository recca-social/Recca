import React, { Component } from "react";
import SearchForm from "../SearchForm";
import userAPI from "../../utils/userAPI";
import Results from "../Results";
import Sidebar from "../Sidebar";

// import Header from "../Header";
// import API from "../utils/API";

class Friends extends Component {
  state = {
    search: "",
    results: [],
    saved: [],
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
    this.searchFriends(this.state.search)
  }

  searchFriends = query => {
    // const results = [];
    userAPI.findUserByName(query).then(function(res) {
      console.log(res.data);
    })
  }

  clearResults = () => {
    this.setState({results: []})
  }

  // componentDidMount() {
  //   this.getFriends();
  // }

  // getFriends = () => {
  //   let userMedia = [];
  //   userAPI.getUserMedia()
  //   .then(function(res) {
  //     // console.log(res.data)
  //     userMedia = res.data.media;
  //   })
  //   .then(() => this.setState({ saved: userMedia }))
  //   .catch(err => console.log(err));
  // }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9 main">
            <SearchForm 
              search={this.state.search}
              handleInputChange={this.handleInputChange}
              handleSearch={this.handleSearch}
            />
            {/* {this.state.results.length ?  */}
              <div className="media-wrapper">
                <h2 className="text-center">Results</h2>
                <button onClick={this.clearResults} className="btn-clear">Clear <i className="icon icon-collapse"></i></button>
                <div className="clearfix"></div>
                <Results 
                  items={this.state.results}
                  clearResults={this.clearResults}
                  resultType="results"
                  handleSave={this.handleSave}
                  handleRecommend={this.handleRecommend}
                  handleInputChange={this.handleInputChange}
                  postText={this.state.postText}
                />
              </div> : ""}
            <hr />
            {this.state.saved ? 
              <div className="media-wrapper">
                <h2 className="text-center">Saved Books</h2>
                <Results 
                  items={this.state.saved}
                  resultType="saved"
                  handleDelete={this.handleDelete}
                  toggleActive={this.toggleActive}
                  toggleCompleted={this.toggleCompleted}
                  handleInputChange={this.handleInputChange}
                  postText={this.state.postText}
                  handleComplete={this.handleComplete}
                  handleRecommend={this.handleRecommend}
                />
              </div> : 
              <p className="text-center empty-media-msg">Use the search bar above to find and save books!</p> }
          </div>
          
          <Sidebar 
            items={this.state.saved}
            toggleActive={this.toggleActive}
            toggleCompleted={this.toggleCompleted}
            mediaType="book"
          />
          </div>
      </div>
    )
  }
};

export default Friends;
