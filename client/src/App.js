import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Mains from "./components/pages/Mains.js";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Nav from "./components/Nav"
import "./styles/fontello/css/fontello.css";
import "./styles/fontello/css/fontello-codes.css";
import "./App.scss";

const App = () => 
   (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/user" component={Mains} >
          <Nav />
          </Route>
        </Switch>
      </div>
    </Router>
  )


export default App;
