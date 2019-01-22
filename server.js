const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes");
const session = require("express-session");
const mongoose = require("mongoose")
const connection = mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/recca");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const config = require("./config/authConfig");
const dotenv =require("dotenv");
const result = dotenv.config();

// Express middleware
if(result.error){
  console.log(error);
} else {
  console.log(result.parsed);
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));
app.use(passport.initialize());
app.use(passport.session());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Adding routes, both API and view
app.use(routes);


// Send every request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to the Mongo DB
connection

// Start the API server
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
