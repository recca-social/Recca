import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/pages/Home";
import Books from "./components/pages/Books";
import Games from "./components/pages/Games";
import Movies from "./components/pages/Movies";
import Music from "./components/pages/Music";
import Shows from "./components/pages/Shows";
import "./styles/fontello/css/fontello.css";
import "./App.scss";

class App extends Component {
  state = {
    currentPage: ""
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  renderPage = () => {
    if (this.state.currentPage === "Movies") {
      return <Movies />;
    } else if (this.state.currentPage === "Shows") {
      return <Shows />
    } else if (this.state.currentPage === "Books") {
      return <Books />
    } else if (this.state.currentPage === "Music") {
      return <Music />
    } else if (this.state.currentPage === "Games") {
      return <Games />
    } else {
      return <Home />;
    }
  };

  render() {
    return (
      <Router>
        <div>
          <Nav
          currentPage={this.state.currentPage}
          handlePageChange={this.handlePageChange}
          />
          {this.renderPage()}
        </div>
      </Router>
    );
  }
}

export default App;
