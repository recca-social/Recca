import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./Nav.scss";

export function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg">
      <Link className="navbar-brand" to="/"
      onClick={() => props.handlePageChange("")}>
        <img src="/images/reccoon-lg.png" alt="Recco logo" className="logo" />
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link to="/movies"
          onClick={() => props.handlePageChange("Movies")}
          className={props.currentPage === "Movies" ? "nav-link active" : "nav-link"}>
            <span className="nav-link__text">
              <i className="icon icon-movie"></i>Movies{props.currentPage === "Movies" ? <span className="sr-only"> (current)</span> : ""}
            </span>
          </Link>
          <Link to="/shows"
          onClick={() => props.handlePageChange("Shows")}
          className={props.currentPage === "Shows" ? "nav-link active" : "nav-link"}>
            <i className="icon icon-show"></i>Shows{props.currentPage === "Shows" ? <span className="sr-only"> (current)</span> : ""}
          </Link>
          <Link to="/books"
          onClick={() => props.handlePageChange("Books")}
          className={props.currentPage === "Books" ? "nav-link active" : "nav-link"}>
            <i className="icon icon-book"></i>Books{props.currentPage === "Books" ? <span className="sr-only"> (current)</span> : ""}
          </Link>
          <Link to="/music"
          onClick={() => props.handlePageChange("Music")}
          className={props.currentPage === "Music" ? "nav-link active" : "nav-link"}>
            <i className="icon icon-music"></i>Music{props.currentPage === "Music" ? <span className="sr-only"> (current)</span> : ""}
          </Link>
          <Link to="/games"
          onClick={() => props.handlePageChange("Games")}
          className={props.currentPage === "Games" ? "nav-link active" : "nav-link"}>
            <i className="icon icon-game"></i>Games{props.currentPage === "Games" ? <span className="sr-only"> (current)</span> : ""}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
