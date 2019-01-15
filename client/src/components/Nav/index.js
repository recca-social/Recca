import React from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";

export function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="navbar-nav">
        <Link className="navbar-brand" to="/">
          <img src="/images/reccoon-lg.png" alt="Recco logo" className="logo" />
        </Link>
        <Link to="/movies"
        className={props.location.pathname === "/movies" ? "nav-link active" : "nav-link"}>
          <div className="nav-link__tab">
            <i className="icon icon-movie"></i>
            <span className="nav-link__text">
              Movies{props.location.pathname === "/movies" ? <span className="sr-only"> (current)</span> : ""}
            </span>
          </div>
        </Link>
        <Link to="/shows"
        className={props.location.pathname === "/shows" ? "nav-link active" : "nav-link"}>
          <div className="nav-link__tab">
            <i className="icon icon-show"></i>
            <span className="nav-link__text">
              Shows{props.location.pathname === "/shows" ? <span className="sr-only"> (current)</span> : ""}
            </span>
          </div>
        </Link>
        <Link to="/books"
        className={props.location.pathname === "/books" ? "nav-link active" : "nav-link"}>
          <div className="nav-link__tab">
            <i className="icon icon-book"></i>
            <span className="nav-link__text">
              Books{props.location.pathname === "/books" ? <span className="sr-only"> (current)</span> : ""}
            </span>
          </div>
        </Link>
        <Link to="/music"
        className={props.location.pathname === "/music" ? "nav-link active" : "nav-link"}>
          <div className="nav-link__tab">
            <i className="icon icon-music"></i>
            <span className="nav-link__text">
              Music{props.location.pathname === "/music" ? <span className="sr-only"> (current)</span> : ""}
            </span>
          </div>
        </Link>
        <Link to="/games"
        className={props.location.pathname === "/games" ? "nav-link active" : "nav-link"}>
          <div className="nav-link__tab">
            <i className="icon icon-game"></i>
            <span className="nav-link__text">
              Games{props.location.pathname === "/games" ? <span className="sr-only"> (current)</span> : ""}
            </span>
          </div>
        </Link>
        <Link to="/friends"
        className={props.location.pathname === "/friends" ? "nav-link ml-auto active" : "nav-link ml-auto"}>
          <div className="nav-link__tab">
            <span className="nav-link__text">
              Friends{props.location.pathname === "/friends" ? <span className="sr-only"> (current)</span> : ""}
            </span>
            <i className="icon icon-users"></i>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
