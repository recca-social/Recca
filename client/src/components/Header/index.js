import React from "react";

const Header = (props) => (
    <div className="jumbotron jumbotron-fluid text-center py-4 bg-secondary">
      <div className="container">
        <h1 className="text-light">{props.title}</h1>
      </div>
    </div>
);

export default Header;