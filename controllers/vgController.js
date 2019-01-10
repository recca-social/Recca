var axios = require("axios");

function parseQueryString(string){
    return string.split("+").join(" ")
}



function parseData(array){
    let parsedArray = [];
    for (let i = 0; i < array.length; i++){
        let platformArray = [];
        if (array[i].platforms == undefined){
            platformArray.push("Unknown Platform")
        } else {
            for (let a = 0; a < array[i].platforms.length; a++){
                platformArray.push(array[i].platforms[a].name)
            }
        }        
        let parsedObject = {
            title: array[i].name,
            description: array[i].summary,
            platforms: platformArray,
            link: array[i].url,
        }
        if(!array[i].release_dates){
            parsedObject.releaseYear = "No release date found"
        }else {
            parsedObject.releaseYear = array[i].release_dates[0].y
        }
        if (!array[i].cover){
            parsedObject.coverArt = "No cover found";
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
                "user-key": "72783dc69b855c01f1c0618ddb9fed6f",
                "Accept": "application/json",
                "Content-type": "text/plain"
            }, 
            data: 'search "'+ parseQueryString(req.params.query) + '"; fields *, cover.*, platforms.*, release_dates.*; limit 10;'
          })
        .then(function(response){
            res.json(parseData(response.data));
        })

    }
}