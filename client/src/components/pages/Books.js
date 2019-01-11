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
    results: []
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

  componentDidMount() {
    this.getBooks("5c37677ee6badaca32d5dc25");
  }


  handleSave = id => {
    const book = this.state.results.find(book => book.apiId === id);
    this.setState({ results : [] })
    mediaAPI.create({
      type: "book",
      title: book.title,
      image: book.image,
      description: book.description,
      link: book.link,
      creator: book.creator,
      genre: book.genre,
      apiId: book.apiId
    }, "5c37677ee6badaca32d5dc25").then(() => {
      //Once the book is saved, reset state for results
      this.setState({ results : [] })
      this.getBooks('5c37677ee6badaca32d5dc25')
    })
  }

  getBooks = id => {
    let userMedia = [];
    userAPI.getUserMedia('5c37677ee6badaca32d5dc25')
    .then(function(res) {
      userMedia = res.data.media;
    })
    .then(() => this.setState({ saved: userMedia }))
    .catch(err => console.log(err));
  }

  handleDelete = id => {
    mediaAPI.delete(id)
    .then(this.getBooks('5c37677ee6badaca32d5dc25'))
    .catch(err => console.log(err))
  }

  handleActive = id => {
    console.log(`Active item with id: ${id}`)
  }

  handleComplete = id => {
    console.log(`Complete item with id: ${id}`)
  }

  handleRecommend = id => {
    console.log(`Recommend item with id: ${id}`)
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
                <Results 
                  items={this.state.results}
                  resultType="results"
                  handleSave={this.handleSave}
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
                  handleActive={this.handleActive}
                  handleComplete={this.handleComplete}
                  handleRecommend={this.handleRecommend}
                />
              </div> : ""}
          </div>
          


          <Sidebar />
          </div>
      </div>
    )
  }
};

export default Books;
