import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer(props) {
  return (
    <div className="footer container-fluid">
      <div className="row">
        <div className="col-md-6 footer__contact">
          <h5>Contact</h5>
          <div className="row">
            <div className="col-md-6 contact--left">
              <p><Link to="mailto:keyes.eric@outlook.com">keyes.eric@outlook.com</Link></p>
              <p><Link to="mailto:brianjfitzgerald@gmail.com">brianjfitzgerald@gmail.com</Link></p>
            </div>
            <div className="col-md-6 contact--right">
              <p><Link to="mailto:cadin.mcqueen@gmail.com">cadin.mcqueen@gmail.com</Link></p>
              <p><Link to="mailto:harrybeckeryoung@gmail.com">harrybeckeryoung@gmail.com</Link></p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h5>Github Repo</h5>
          <p className="text-center"><Link to="https://github.com/brijamfitz/Recco" target="_blank">github.com/brijamfitz/Recco</Link></p>
        </div>
        { props.loginPage ? "" : <Link to="/logout" className="btn btn-logout">Logout <i className="icon icon-logout"></i></Link>}
      </div>
    </div>
  )
}

export default Footer;