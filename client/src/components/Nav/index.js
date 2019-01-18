import React, { Component } from "react";
import { Link } from "react-router-dom";
import userAPI from "../../utils/userAPI";
import "./Nav.scss";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
    };

    this.getName = this.getName.bind(this);
  }

  componentDidMount() {
    this.getName();
  }

  getName = () => {
    userAPI.getUserMedia()
    .then((res) => {
      this.setState({ firstName: res.data.firstName });
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="navbar-nav">
          <Link className="navbar-brand" to="/home">
            <img src="/images/recca-black.png" alt="Recca logo" className="logo" />
          </Link>
          <Link to="/movies"
          className={this.props.location.pathname === "/movies" ? "nav-link active" : "nav-link"}>
            <div className="nav-link__tab">
              <i className="icon icon-movie"></i>
              <span className="nav-link__text">
                Movies{this.props.location.pathname === "/movies" ? <span className="sr-only"> (current)</span> : ""}
              </span>
            </div>
          </Link>
          <Link to="/shows"
          className={this.props.location.pathname === "/shows" ? "nav-link active" : "nav-link"}>
            <div className="nav-link__tab">
              <i className="icon icon-show"></i>
              <span className="nav-link__text">
                Shows{this.props.location.pathname === "/shows" ? <span className="sr-only"> (current)</span> : ""}
              </span>
            </div>
          </Link>
          <Link to="/books"
          className={this.props.location.pathname === "/books" ? "nav-link active" : "nav-link"}>
            <div className="nav-link__tab">
              <i className="icon icon-book"></i>
              <span className="nav-link__text">
                Books{this.props.location.pathname === "/books" ? <span className="sr-only"> (current)</span> : ""}
              </span>
            </div>
          </Link>
          <Link to="/music"
          className={this.props.location.pathname === "/music" ? "nav-link active" : "nav-link"}>
            <div className="nav-link__tab">
              <i className="icon icon-music"></i>
              <span className="nav-link__text">
                Music{this.props.location.pathname === "/music" ? <span className="sr-only"> (current)</span> : ""}
              </span>
            </div>
          </Link>
          <Link to="/games"
          className={this.props.location.pathname === "/games" ? "nav-link active" : "nav-link"}>
            <div className="nav-link__tab">
              <i className="icon icon-game"></i>
              <span className="nav-link__text">
                Games{this.props.location.pathname === "/games" ? <span className="sr-only"> (current)</span> : ""}
              </span>
            </div>
          </Link>
          <p className="greeting">Hello, <strong>{this.state.firstName}</strong></p>
          <Link to="/friends"
          className={this.props.location.pathname === "/friends" ? "nav-link active" : "nav-link"}>
            <div className="nav-link__tab">
              <span className="nav-link__text sr-only">
                Friends{this.props.location.pathname === "/friends" ? <span className="sr-only"> (current)</span> : ""}
              </span>
              <i className="icon icon-users"></i>
            </div>
          </Link>
        </div>
      </nav>
    );
  }
}

export default Nav;
