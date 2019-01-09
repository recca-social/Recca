const axios = require("axios");

// Does not have acces to the react proxy because we are in the backend
// if success will console log "We're logged in"

axios.post("http://localhost:3001/login/signup", {
    username: "testGuy15",
    password: "testGuy15",
    firstName: "Test",
    lastName: "Guy15"
})
.then(axios.get("http://localhost:3001/logout"))
.then(axios.post("http://localhost:3001/login/local", {
    username: "testGuy15",
    password: "testGuy15"
}))







