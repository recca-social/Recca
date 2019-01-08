var axios = require("axios");
var querystring = require('querystring');



module.exports = {
    search: function(req, res){
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
                console.log(spotifyResponse.data);
                res.json(spotifyResponse.data)
            })
        })
    }
}