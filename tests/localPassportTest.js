const axios = require("axios");

// Does not have acces to the react proxy because we are in the backend
// if success will console log "We're logged in"
axios.post("http://localhost:3001/login/local", {
    username: "testGuy1",
    password: "testGuy1"
})

