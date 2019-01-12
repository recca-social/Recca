var axios = require("axios");
const apiKey = '41d470d9'

module.exports = {
    searchSeries: function(req, res){

        axios.get("http://www.omdbapi.com/?apikey=" + apiKey + "&type=series&s=" + req.params.query)
        .then(function(response){
            if (!response.data.Search){
                res.json("No results found")
            } else {
                let responseArray = response.data.Search
                let parsedArray = [];
                for (let i = 0; i < responseArray.length; i++){
                axios.get("http://www.omdbapi.com/?apikey=" + apiKey + "&type=series&i=" + responseArray[i].imdbID)
                .then(function(eachResponse){
                    let parsedObject = {
                        title: eachResponse.data.Title,
                        summary: eachResponse.data.Plot,
                        poster: eachResponse.data.Poster,
                        director: eachResponse.data.Director,
                        genre: eachResponse.data.Genre,
                        link: "https://www.imdb.com/title/" + eachResponse.data.imdbID,
                        year: eachResponse.data.Year
                    }
                    console.log(parsedObject)
                    parsedArray.push(parsedObject);
                    console.log(parsedArray);
                    if (responseArray.length === parsedArray.length){
                        res.json(parsedArray)
                    }
                })
            }
            }
        })
    },
    searchMovies: function(req, res){
        axios.get("http://www.omdbapi.com/?apikey=" + apiKey + "&type=movie&s=" + req.params.query)
        .then(function(response){
            if (!response.data.Search){
                res.json("No results found")
            } else {
                let responseArray = response.data.Search
                let parsedArray = [];
                for (let i = 0; i < responseArray.length; i++){
                axios.get("http://www.omdbapi.com/?apikey=" + apiKey + "&type=movie&i=" + responseArray[i].imdbID)
                .then(function(eachResponse){
                    let parsedObject = {
                        title: eachResponse.data.Title,
                        summary: eachResponse.data.Plot,
                        poster: eachResponse.data.Poster,
                        director: eachResponse.data.Director,
                        genre: eachResponse.data.Genre,
                        link: "https://www.imdb.com/title/" + eachResponse.data.imdbID,
                        year: eachResponse.data.Year
                    }
                    console.log(parsedObject)
                    parsedArray.push(parsedObject)
                    console.log(parsedArray);
                    if (responseArray.length === parsedArray.length){
                        res.json(parsedArray)
                    }
                })
            }
            }
            
            
        })
    }
}