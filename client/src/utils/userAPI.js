import axios from "axios";

export default {
    isLoggedIn: function () {
        return axios.get("/login/check")
    },

    localLogIn: function (username, password) {
        return axios.post("/login/local",{
                username: username,
                password: password,
            })
    },

    findUserbyUsername: function(username){
        return axios.get("/api/user/friend", {
            username: username
        })
    },

    newFriendRequest:function (userOneId, userTwoId){
      return axios.post("/api/user/friend",{
          participants:[userOneId, userTwoId],
      })  
    },

    handleFriendRequest: function(status){
        return axios.put("/api/user/friend", {
            status:status
        })
    },

    facebookLogIn: function () {
        return axios.get("/login/facebook")
    },

    getUserMedia: function (id) {
        return axios.get("api/user/find/" + id)
    }
}