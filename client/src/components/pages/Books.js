import React, { Component } from "react";
import bookAPI from "../../utils/bookAPI";
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
              image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "http://placehold.it/128x195",
              description: book.volumeInfo.description ? book.volumeInfo.description : "",
              link: book.volumeInfo.infoLink ? book.volumeInfo.infoLink : "",
              creators: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Author not found",
              genre: book.volumeInfo.categories ? book.volumeInfo.categories.join(", ") : "",
              apiId: book.id
            }
          )
        });
      })
      .then(() => console.log(results))
      .then(() => this.setState({ results }))
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.searchBooks("iain banks");
  }

  handleBookSave = id => {
    const book = this.state.results.find(book => book.apiId === id);
    console.log(book);
    this.setState({ results : [] })
    bookAPI.saveBook({
      type: "book",
      title: book.title,
      image: book.image,
      description: book.description,
      link: book.link,
      creators: book.authors,
      genre: book.genre,
      apiId: book.apiId
    }).then(() => {
      //Once the book is saved, reset state for results
      this.setState({ results : [] })
    })
  };

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
              <div className="results-wrapper">
                <h2 className="text-center">Results</h2>
                <Results 
                  results={this.state.results}
                  handleBookSave={this.handleBookSave}
                />
              </div> : ""}
            <hr />
            {this.state.saved ? 
              <div>
                <h2 className="text-center">Saved Books</h2>
                <Results 
                  saved={this.state.saved}
                  handleBookSave={this.handleBookSave}
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
