import React from "react";
import "./Header.scss"

const Header = (props) => (
    <div className="jumbotron jumbotron-fluid text-center py-0 header">
      <div className="container">
        <h1>{props.title}</h1>
      </div>
    </div>
);

export default Header;