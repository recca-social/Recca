import axios from "axios";

const showAPI = {
    search: function(query){
        return axios.get("/api/omdb/show/search/" + query)
    }
}

export default showAPI
