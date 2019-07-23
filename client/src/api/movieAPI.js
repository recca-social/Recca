import axios from "axios"

const movieAPI = {
    search: function(query){
        return axios.get("/api/omdb/movie/search/" + query)
    }
}

export default movieAPI
