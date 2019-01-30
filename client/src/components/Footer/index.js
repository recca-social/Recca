import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer(props) {
  const emailObj = {
    admin: "admin@recca.social"
  }
  return (
    <div className="footer container-fluid">
      <div className="row">
        <div className="col-md-6 footer__contact">
          <h5>Contact</h5>
          <p><a href={"mailto:" + emailObj.admin}>{emailObj.admin}</a></p>
        </div>
        <div className="col-md-6">
          <h5>Github Repo</h5>
          <p><a href="https://github.com/recca-social/Recca" target="_blank" rel="noopener noreferrer">github.com/recca-social/Recca</a></p>
        </div>
        { props.loginPage ? "" : <Link to="/logout" className="btn btn-logout">Logout <i className="icon icon-logout"></i></Link>}
      </div>
    </div>
  )
}

export default Footer;