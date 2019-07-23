import axios from 'axios'

const musicAPI = {
    searchAlbum: function(query){
        return axios.get("api/spotify/search/album/" + query)
    }
}

export default musicAPI
