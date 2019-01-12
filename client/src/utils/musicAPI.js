const axios = require("axios")


export default {
    //hits back end (due to spotify authentication) to retreive information
    searchAlbum: function(query){
        return axios.get("api/spotify/search/album/" + query)
    }
}