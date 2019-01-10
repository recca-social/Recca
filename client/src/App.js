import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/pages/Home";
import Books from "./components/pages/Books";
import Games from "./components/pages/Games";
import Movies from "./components/pages/Movies";
import Music from "./components/pages/Music";
import Shows from "./components/pages/Shows";
import Friends from "./components/pages/Friends";
import Login from "./components/Login";
import "./styles/fontello/css/fontello.css";
import "./styles/fontello/css/fontello-codes.css";
import "./App.scss";

const App = () => {
    return (
      <Router>     
        <div>
          <Route path={["/", "books", "games", "movies", "music", "shows", "friends"]} component={Nav} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/books" component={Books} />
            <Route exact path="/games" component={Games} />
            <Route exact path="/movies" component={Movies} />
            <Route exact path="/music" component={Music} />
            <Route exact path="/shows" component={Shows} />
            <Route exact path="/friends" component={Friends} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    );
}

export default App;
