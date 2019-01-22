var axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
var querystring = require('querystring');

function parseAlbums(spotifyObject){
    const albumArray = spotifyObject.albums.items;
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
            "Authorization":process.env.SPOTIFY_AUTH
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
                if (spotifyResponse.data.albums.items.length === 0){
                    res.json({message: "No results found"})
                } else {
                    
                    res.json(parseAlbums(spotifyResponse.data))
                }

            })
        })
    }
}