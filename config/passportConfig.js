const passport = require('passport'),
  LocalStrat = require('passport-local').Strategy,
  FacebookStrat = require('passport-facebook').Strategy,
  db = require("../models"),
  config = require("./authConfig")

passport.use('local-login', new LocalStrat({
  usernameField: 'username',
  passwordField: 'password',
}, function (username, password, done) {
  console.log("You're in passport");
  db.User.findOne({ username: username }).then(function (user) {
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
    db.User.findOne({ username: username }).then(function (err, user) {
      if (err) throw err;
      if (user) {
        return done(null, false, { message: "Username in use" })
      } else if (password && req.body.firstName && req.body.lastName) {
        var newUsername = username;
        var newPassword = password;
        var newFirstName = req.body.firstName;
        var newLastName = req.body.lastName;
        db.User.create({
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
  callbackUrl: config.callback_url,
  passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    let user = req.user;
    user.facebook.id = profile.id;
    user.facebook.token = accessToken;
    user.save()
      .then(user => done(null, user, { nextRoute: "/profile" }))
      .catch(err => done(err))
  } else {
    User.findOne({ 'facebook.token': accessToken }, function (err, user) {
      if (err) return done(err);
      if (!user) {
        var newUser = new User();
        newUser.facebook.id = profile.id;
        newUser.facebook.token = accessToken;
        username = profile.displayName;
        firstName = profile.name.givenName;
        lastName = profile.name.familyName;
        newUser.save()
          .then(done(null, user))
          .catch(err => done(err))
      } else {
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