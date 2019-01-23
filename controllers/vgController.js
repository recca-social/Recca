var axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

function parseQueryString(string){
    return string.split("+").join(" ")
}

function parseData(array){
    let parsedArray = [];
    for (let i = 0; i < array.length; i++){
        let platformArr = [];
        if (array[i].platforms) {
            for (let a = 0; a < array[i].platforms.length; a++){
                platformArr.push(array[i].platforms[a].name)
            }
        } else {
            platformArr = false;
        }

        let genreArr = [];
        if (array[i].genre) {
            for (let a = 0; a < array[i].genres.length; a++){
                genreArr.push(array[i].genres[a].name)
            }
        } else {
            genreArr = false;
        }

        let parsedObject = {
            title: array[i].name,
            description: array[i].summary,
            platforms: platformArr,
            link: array[i].url,
            apiId: array[i].id,
            genre: genreArr,
            rating: array[i].rating
        }

        if (!array[i].release_dates){
            parsedObject.releaseYear = false
        } else {
            parsedObject.releaseYear = array[i].release_dates[0].y
        }
        if (!array[i].cover || !array[i].cover.hasOwnProperty("url")) {
            parsedObject.coverArt = false;
            parsedArray.push(parsedObject);
        } else {
            let parsedURL = array[i].cover.url.split("t_thumb").join("t_cover_big")
            parsedObject.coverArt = parsedURL
            parsedArray.push(parsedObject);
        }
    }
    return parsedArray;
}

module.exports = {
    search: function(req, res){
        
        axios({
            method: 'POST',
            url: "https://api-v3.igdb.com/games/",
            headers: {                
                "user-key": process.env.IGDB_KEY,
                "Accept": "application/json",
                "Content-type": "text/plain"
            }, 
            data: 'search "'+ parseQueryString(req.params.query) + '"; fields *, cover.*, genres.*, platforms.*, release_dates.*; limit 10;'
          })
        .then(function(response) {
            if (response.data.length === 0) {
                res.json({message:"No results found"})
            } else {
                res.json(parseData(response.data));
            }
        })
        .catch(err => console.log(err));
    }
}