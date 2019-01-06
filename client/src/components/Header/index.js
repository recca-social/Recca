import React from "react";

const Header = (props) => (
    <div className="jumbotron jumbotron-fluid text-center py-4">
      <div className="container">
        <h1 className="display-4">{props.title}</h1>
      </div>
    </div>
);

export default Header;