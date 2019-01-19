import axios from "axios";

export default {
    findUserByName: function(query) {
        return axios.post("/api/friend/find", {
          query: query
        });
      },
    
      pendingRequest: function() {
        return axios.get("/api/friend/");
      },
    
      newFriendRequest: function(requestTo) {
        return axios.post("/api/friend/",{
          requestTo: requestTo
        });
      },
    
      handleFriendRequest: function(id, status) {
        return axios.put("/api/friend/", {
          id: id,
          status: status
        });
      },

      removeFriend: function (id) {
          return axios.put("/api/friend/remove", {
              id:id
          })
      }
}