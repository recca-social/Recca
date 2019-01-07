const passport = require('passport')
const LocalStrat = require('passport-local').Strategy;
const db = require("../models")

passport.use('local-login', new LocalStrat({
  usernameField: 'username',
  passwordField: 'password',
}, function (username, password, done) {
  console.log("You're in passport");
  db.User.findOne({username: username }).then(function (user) {
      console.log("Here's the retrieved info:" + user)
      // check if username exists
      if (!user) {
          return done(null, false, { message: "Unkown username." });
          // use hash checker to check password
      } else if (!user.comparePassword(password)) {
          return done(null, false, { message: "incorrect password" });
          // if it clears both check return the user
      } else {
          return done(null, user);
      }
  })
}));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport