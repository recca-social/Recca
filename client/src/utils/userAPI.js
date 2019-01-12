import axios from "axios";

export default {
    isLoggedIn: function () {
        return axios.get("/login/check")
    },

    localLogIn: function (username, password) {
        return axios.post("/login/local",
            {
                username: username,
                password: password,
            })
    },

    facebookLogIn: function () {
        return axios.get("/login/facebook")
    },

    getUserMedia: function (id) {
        return axios.get("api/user/find/")
    },
    
    getUserFeed: function () {
        return axios.get("api/user/feed/")
    }
}