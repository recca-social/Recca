import axios from "axios";

export default {
    search: function(query){
        axios.get("https://www.googleapis.com/books/v1/volumes?q=" + query)
    }
}