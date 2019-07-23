import axios from "axios"

const gameAPI = {
    search: function(query){
        return axios.get("api/vg/search/" + query)
    }
}

export default gameAPI
