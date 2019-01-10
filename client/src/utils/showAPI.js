import axios from "axios";
const apiKey = '41d470d9'

export default {
    search: function(query){
        return axios.get("http://www.omdbapi.com/?apikey=" + apiKey + "&type=series&s=" + query)
    }
    
}