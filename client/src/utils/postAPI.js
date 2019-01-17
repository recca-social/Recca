import axios from "axios";

export default {
    post: function(mediaObj){
        return axios.post("/api/post/create", mediaObj)
    }
}