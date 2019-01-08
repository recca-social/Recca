const axios = require("axios");

// Does not have acces to the react proxy because we are in the backend
// if success will console log "We're logged in"

axios.post("http://https://serene-scrubland-33759.herokuapp.com/login/signup", {
    username: "testGuy15",
    password: "testGuy15",
    firstName: "Test",
    lastName: "Guy15"
})
.then(axios.get("https://serene-scrubland-33759.herokuapp.com/logout"))
.then(axios.post("https://serene-scrubland-33759.herokuapp.com/login/local", {
    username: "testGuy15",
    password: "testGuy15"
}))


// facebook login test

axios.get("http:")






