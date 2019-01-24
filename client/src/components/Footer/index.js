import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer(props) {
  const emailObj = {
    eric: "keyes.eric@outlook.com",
    brian: "brianjfitzgerald@gmail.com",
    cadin: "cadin.mcqueen@gmail.com",
    harry: "harrybeckeryoung@gmail.com"
  }
  return (
    <div className="footer container-fluid">
      <div className="row">
        <div className="col-md-6 footer__contact">
          <h5>Contact</h5>
          <div className="row">
            <div className="col-md-6 contact--left">
              <p><a href={"mailto:" + emailObj.eric}>{emailObj.eric}</a></p>
              <p><a href={"mailto:" + emailObj.brian}>{emailObj.brian}</a></p>
            </div>
            <div className="col-md-6 contact--right">
              <p><a href={"mailto:" + emailObj.cadin}>{emailObj.cadin}</a></p>
              <p><a href={"mailto:" + emailObj.harry}>{emailObj.harry}</a></p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h5>Github Repo</h5>
          <p className="text-center"><a href="https://github.com/brijamfitz/Recca" target="_blank">github.com/brijamfitz/Recca</a></p>
        </div>
        { props.loginPage ? "" : <Link to="/logout" className="btn btn-logout">Logout <i className="icon icon-logout"></i></Link>}
      </div>
    </div>
  )
}

export default Footer;