import axios from "axios"

const bookAPI = {
    search: function(query){
        return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + query)
    }
}

export default bookAPI