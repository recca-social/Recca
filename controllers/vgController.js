var axios = require("axios");

function parseQueryString(string){
    return string.split("+").join(" ")
}

function parsePlatform(id){
    if (id == 6){
        return "PC"
    } else if (id == 14){
        return "Mac OS"
    } else if (id == 3) {
        return "Linux"
    } else if (id == 7){
        return "PlayStation"
    } else if (id == 8){
        return "PlayStation 2"
    } else if (id == 9){
        return "PlayStation 3"
    } else if (id == 48){
        return "Playstation 4"
    } else if (id == 165){
        return "PlayStation VR"
    } else if ( id == 46){
        return "PlayStation Vita"
    } else if (id == 38){
        return "PlayStation Portable"
    } else if (id == 18){
        return "Nintendo Entertainment System (NES)"
    } else if (id == 19){
        return "Super Nintendo Entertainment System (SNES)"
    } else if (id == 21){
        return "Nintendo GameCube"
    } else if ( id == 130){
        return "Nintendo Switch"
    } else if (id == 4){
        return "Nintendo 64"
    } else if (id == 20){
        return "Nintendo DS"
    } else if (id == 159){
        return "Nintendo DSi"
    } else if (id == 37){
        return "Nintendo 3DS"
    } else if ( id == 5){
        return "Wii"
    } else if ( id == 41){
        return "Wii U"
    } else if (id == 29){
        return "Sega Genesis"
    } else if (id == 64){
        return "Sega Master System"
    } else if (id == 84){
        return "Sega Game 1000"
    } else if (id == 49){
        return "Xbox One"
    } else if (id == 12){
        return "Xbox 360"
    } else if (id == 11){
        return "Xbox"
    } else if ( id == 60){
        return "Atari 7800 ProSystem"
    } else if ( id == 66){
        return "Atari 5200 SuperSystem"
    } else if (id == 59){
        return "Atari 2600"
    } else if (id == 63){
        return "Atari ST/STE"
    } else if ( id == 61){
        return "Atari Lynx"
    } else if ( id == 65){
        return "Atari 8-bit"
    } else if ( id == 62){
        return "Atari Jaguar"
    } else if ( id == 67){
        return "Intellivision"
    } else if ( id == 45){
        return "PlayStation Network"
    } else if (id == 36){
        return "Xbox Live Arcade"
    } else {
        return "Unknown Platform"
    }
}

// function findCover(id){
//     console.log("at findCover")
//     axios({
//         method: 'POST',
//         url: "https://api-v3.igdb.com/covers/",
//         headers: {                
//             "user-key": "72783dc69b855c01f1c0618ddb9fed6f",
//             "Accept": "application/json",
//             "Content-type": "text/plain"
//         }, 
//         data: 'where id = ' + id + '; fields *;'
//       })
//     .then(function(response){
//         return response.data.url;
//     })
//     .catch(err => {
//         console.error(err);
//     });
// }

function parseData(array){
    let parsedArray = [];
    for (let i = 0; i < array.length; i++){
        let platformArray = [];
        if (array[i].platforms == undefined){
            platformArray.push("Unknown Platform")
        } else {
            for (let a = 0; a < array[i].platforms.length; a++){
                platformArray.push(parsePlatform(array[i].platforms[a]))
            }
        }        
        let parsedObject = {
            title: array[i].name,
            description: array[i].summary,
            platforms: platformArray,
            link: array[i].url,
        }
        if (array[i].cover == undefined){
            parsedObject.coverArt = "No cover found";
            parsedArray.push(parsedObject);
        } else {
                // parsedObject.coverArt = findCover(array[i].cover)
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
            data: 'search "'+ parseQueryString(req.params.query) + '"; fields *; limit 10;'
          })
        .then(function(response){
            res.json(parseData(response.data));
        })

    }
}