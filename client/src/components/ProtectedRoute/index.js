import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authHandler } from "../../api";

class ProtectedRoute extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loaded: false,
            isAuth: false,
        }
    }
   

    componentWillMount(){
        let localAuth = authHandler.checkAuth();
        this.setState({
            isAuth : localAuth,
            loaded: true,
        })
    }


    render() {
        return (
            <Route {...this.props} render={(...props) => (
                this.state.isAuth ?
                    <React.Component {...this.props.component} /> :
                    <Redirect to="/" />
            )} />
        )
    };
};

export default ProtectedRoute;