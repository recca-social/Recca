import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import authHandler from "../../utils/authHandler";

class ProtectedRoute extends React.Component {
    constructor({ component: Component, ...rest }) {
        super({component:Component, ...rest})

    }
    render() {
        return (
            <Route {...rest} render={(props) => (
                authHandler.isAuthenticated === true ?
                    <Component {...props} /> :
                    <Redirect to="/" />
            )
            } />
        )
    };
};

export default ProtectedRoute;