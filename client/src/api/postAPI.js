import axios from "axios";

const postAPI = {
    post: function(mediaObj){
        return axios.post("/api/post/create", mediaObj)
    }
}

export default postAPI
