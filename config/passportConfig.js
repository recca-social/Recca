const passport = require('passport'),
  LocalStrat = require('passport-local').Strategy,
  FacebookStrat = require('passport-facebook').Strategy,
  User = require("../models/user"),
  config = require("./authConfig")

passport.use('local-login', new LocalStrat({
  usernameField: 'username',
  passwordField: 'password',
}, function (username, password, done) {
  console.log("You're in passport");
  User.findOne({ username: username }).then(function (user) {
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

passport.use('local-signup', new LocalStrat({
  passReqToCallback: true
},
  function (req, username, password, done) {
    User.findOne({ username: username }).then(function (err, user) {
      if (err) throw err;
      if (user) {
        return done(null, false, { message: "Username in use" })
      } else if (password && req.body.firstName && req.body.lastName) {
        var newUsername = username;
        var newPassword = password;
        var newFirstName = req.body.firstName;
        var newLastName = req.body.lastName;
        User.create({
          username: newUsername,
          password: newPassword,
          firstName: newFirstName,
          lastName: newLastName
        }).then(function (newUser) {
          return done(null, newUser)
        })
      }
    })
  }
));

passport.use('facebook-auth', new FacebookStrat({
  clientID: config.facebook_app_id,
  clientSecret: config.facebook_app_secret,
  callbackURL: config.callback_url,
  passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {
  // if we're signed in
  if (req.user) {
    User.findOne({ 'username': req.user.username }).then(function (err, user) {
      // check for facebook access token, if we can't find one, add this one and return the user
      if (!user.facebook.token) {
        var thisUser = user;
        thisUser.facebook.token = accessToken;
        thisUser.facebook.id = profile.id
        thisUser.save()
          .then(done(null, user))
          .catch(err => done(err))
      } else {
        // we  do find one and we're done, returning the user
        return done(null, user)
      }
    })
  } else {
    //we're not signed in and we need to check if the accesstoken is on one of our user models
    User.findOne({ 'facebook.token': accessToken }).then(function (err, user) {
      if (err) return done(err);
      // if we don't find a user with that accessToken, we make on with the data provided by facebook
      if (!user) {
        var newUser = new User();
        newUser.facebook.token = accessToken;
        newUser.facebook.id = profile.id;
        newUser.username = profile.displayName;
        // if facebook data is incomplete we cheat
        if ((profile.name.givenName) && (profile.name.lastName)) {
          newUser.firstName = profile.givenName;
          newUser.lastName = profile.familyName
        } else {
          var nameArr = profile.displayName.split(" ");
          newUser.firstName = nameArr[0];
          newUser.lastName = nameArr[1];
        }
        newUser.save()
          .then(done(null, user))
          .catch(err => done(err))
      } else {
        // if we do find one we sign 'em in easy peasy
        return done(null, user)
      }
    })
  }
}));




passport.serializeUser(function (user, done) {
  done(null, user.id);
});


passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = passport