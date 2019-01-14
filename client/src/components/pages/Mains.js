import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Books, Friends, Home, Games, Movies, Music, Shows } from "./MediaPages/index";
import "./mediaPages.scss";




class Mains extends Component {
    render() {
        return (
            <div>
                <Router>
                        <Switch>
                            <Route exact path="/books" component={Books} />
                            <Route exact path="/games" component={Games} />
                            <Route exact path="/friends" component={Friends} />
                            <Route exact path="/movies" component={Movies} />
                            <Route exact path="/music" component={Music} />
                            <Route exact path="/shows" component={Shows} />
                            <Route path="/" component={Home} />
                        </Switch>
                </Router>
            </div>
        )
    }
}

export default Mains;