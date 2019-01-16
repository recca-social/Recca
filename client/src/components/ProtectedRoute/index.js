import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import authHandler from "../../utils/authHandler";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            authHandler.isAuthenticated === true?
                <Component {...props} /> :
                <Redirect to="/" />
                )
        } />
    )
};

export default ProtectedRoute;