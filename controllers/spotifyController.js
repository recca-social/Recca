var axios = require("axios");
var querystring = require('querystring');

function parseAlbums(spotifyObject){
    const albumArray = spotifyObject.albums.items;
    console.log(albumArray)
    let parsedArray = [];
    for ( let i = 0; i < albumArray.length; i++){
        let artistArray = [];
        for (let a = 0; a < albumArray[i].artists.length; a++){
            artistArray.push(albumArray[i].artists[a].name)
        }
        let albumObject = {
            albumName: albumArray[i].name,
            artist: artistArray,
            albumLink: albumArray[i].external_urls,
            apiId: albumArray[i].id,
            image: albumArray[i].images[0].url
        }
        parsedArray.push(albumObject)
    }
    return parsedArray;
}

module.exports = {
    searchAlbum: function(req, res){
        axios.post("https://accounts.spotify.com/api/token", 
        querystring.stringify({
            "grant_type": "client_credentials"
        }),{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization":"Basic Njc0ZjJiMTQ5OTk1NDU0NGIwZTZmZTU0MWU3MzQyYmU6ODQ2ZDNkMGI5ODIwNDE5OTg1ODI4NTZkNTQzMTgxZWU="
        }
        })
        .then(function(response){
            let spotifyToken = response.data.access_token
            axios.get("https://api.spotify.com/v1/search/?type=album&q=" + req.params.query,
            {
                headers: {
                    "Authorization": "Bearer " + spotifyToken
                }
            })
            .then(function(spotifyResponse){
                res.json(parseAlbums(spotifyResponse.data))
            })
        })
    }
}