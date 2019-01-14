import React, { Component } from "react";
import bookAPI from "../../utils/bookAPI";
import mediaAPI from "../../utils/mediaAPI";
import userAPI from "../../utils/userAPI";
import SearchForm from "../SearchForm";
import Sidebar from "../Sidebar";
import Results from "../Results";
import "./mediaPages.scss";

class Books extends Component {
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
    this.searchBooks(this.state.search)
  }

  searchBooks = query => {
    const results = [];
    bookAPI.search(query)
      .then(function(res) {
        res.data.items.forEach(book => {
          results.push(
            {
              type: "book",
              title: book.volumeInfo.title ? book.volumeInfo.title : "",
              image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "http://placehold.it/128x170",
              description: book.volumeInfo.description ? book.volumeInfo.description : "No description available",
              link: book.volumeInfo.infoLink ? book.volumeInfo.infoLink : "",
              creator: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "",
              genre: book.volumeInfo.categories ? book.volumeInfo.categories.join(", ") : "",
              apiId: book.id
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
    this.getBooks();
  }

  handleSave = id => {
    const book = this.state.results.find(book => book.apiId === id);
    this.setState({ search: "", results : [] })
    mediaAPI.create({
      type: "book",
      title: book.title,
      image: book.image,
      description: book.description,
      link: book.link,
      creator: book.creator,
      genre: book.genre,
      apiId: book.apiId
    }).then(() => {
      //Once the book is saved, reset state for results
      this.setState({ results : [] })
      this.getBooks()
    })
  }

  getBooks = () => {
    let userMedia = [];
    userAPI.getUserFeed()
    .then(function(res) {
      // console.log(res.data)
      userMedia = res.data.media;
    })
    .then(() => this.setState({ saved: userMedia }))
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
    .then(this.getBooks('5c37677ee6badaca32d5dc25'))
    .catch(err => console.log(err))
  }

  toggleActive = id => {
    mediaAPI.toggleActive(id)
    .then(this.getBooks('5c37677ee6badaca32d5dc25'))
    .catch(err => console.log(err))
  }

  handleComplete = id => {
    console.log(`Complete item with id: ${id}`)
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
            mediaType="book"
          />
          </div>
      </div>
    )
  }
};

export default Books;
