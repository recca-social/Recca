import axios from "axios";

export default {
    isLoggedIn: function () {
        return axios.get("/login/check")
    },

    localLogIn: function (username, password) {
        return axios.post("/login/local", {
            username: username,
            password: password,
        })
    },

    logOut: function() {
        return axios.get("/logout")
    },

    findUserByName: function (query) {
        return axios.get("/api/user/find/user", {
            query: query
        })
    },

    pendingRequest: function () {
        return axios.get("/api/user/friend")
    },

    newFriendRequest: function (requestTo) {
        return axios.post("/api/user/friend", {
            requestTo: requestTo,
        })
    },

    handleFriendRequest: function (status) {
        return axios.put("/api/user/friend", {
            status: status
        })
    },

    facebookLogIn: function () {
        return axios.get("/login/facebook")
    },

    getUserMedia: function () {
        return axios.get("api/user/find")
    },

    getUserFeed: function () {
        return axios.get("api/user/feed/")
    }
}