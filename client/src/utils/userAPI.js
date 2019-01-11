import axios from "axios";

export default {
  getUserMedia: function(id){
    return axios.get("api/user/find/" + id)
  }
}