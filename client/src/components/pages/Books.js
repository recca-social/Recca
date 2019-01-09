import React, { Component } from "react";
import booksAPI from "../utils/booksAPI";
import SearchForm from "../SearchForm";
import Sidebar from "../Sidebar";
import Results from "../Results/bookResults.js";
import "./mediaPages.scss";

class Books extends Component {
  state = {
    search: "",
    bookList: [],
    bookResults: []
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
    booksAPI.search(query)
      .then(function(res) {
        res.data.items.forEach(book => {
          results.push(
            //TODO make this object match our data model
            {
              id: book.id,
              title: book.volumeInfo.title ? book.volumeInfo.title : "Title not found",
              link: book.volumeInfo.infoLink ? book.volumeInfo.infoLink : "",
              authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Author not found",
              image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "http://placehold.it/128x195",
              description: book.volumeInfo.description ? book.volumeInfo.description : "Description not found"
            }
          )
        });
      })
      .then(() => this.setState({ books: results }))
      .catch(err => console.log(err));
  };

  // TODO fix this route to match our data model
  /*
  handleBookSave = id => {
    const book = this.state.books.find(book => book.id === id);
    booksAPI.saveBook({
      id: book.id,
      title: book.title,
      link: book.link,
      authors: book.authors,
      image: book.image,
      description: book.description
    }).then(() => {
      alert(`A book added to your saved list:\n${book.title}`)
    })
  };
  */

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
            {this.state.bookResults.length ? 
              <Results 
                books={this.state.books}
                handleBookSave={this.handleBookSave}
              /> : ""}
            <hr />
            {this.state.bookList ? 
              <div>
                <h2 className="text-center">Saved Books</h2>
                <Results 
                  books={this.state.books}
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
