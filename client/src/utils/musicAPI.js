const axios = require("axios")

const id = '674f2b1499954544b0e6fe541e7342be'
const secret = '846d3d0b982041998582856d543181ee'
const headers = {
    "Authorization":"Basic Njc0ZjJiMTQ5OTk1NDU0NGIwZTZmZTU0MWU3MzQyYmU6ODQ2ZDNkMGI5ODIwNDE5OTg1ODI4NTZkNTQzMTgxZWU="
}
const body = {
    "grant_type":"client_credentials"
}

export default {
    searchAlbum: function(query){
        return axios.get("api/spotify/" + query)
    }
}