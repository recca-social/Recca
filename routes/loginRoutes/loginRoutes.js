const router = require("express").Router();
const passport = require("../../config/passportConfig")

router.route("/check").get(function (req, res) {
  if (req.user) {
    res.send(true);
  } else {
    res.send(false)
  }
})

router.route("/local").post(function (req, res, next) {
  passport.authenticate('local-login', function (err, user, info) {
    if (err) { return next(err) }
    if (!user) {
       return res.json({ message: 'Username or password is incorrect' }) }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      console.log("we're logged in");
      return res.json({ user: user });
    });
  })(req, res, next);
});

router.route("/signup").post(function (req, res, next) {
  passport.authenticate('local-signup', function (err, user, info) {
    console.log("User: " + user)
    if (err) { return next(err) };
    if (!user) {
      console.log("We're in the !user block of the verification callback here is the info")
      return res.json({message: "Username is in use, please try again"})
    };
    req.logIn(user, function (err) {
      if (err) { return next(err) }
      console.log("successful login");
      res.json({ user: user });
    });
  })(req, res, next);
})

router.route("/facebook").get(passport.authenticate('facebook', { scope: 'public_profile' }));

router.route("/facebook/callback").get(function (req, res, next) {
  passport.authenticate('facebook-auth', function (err, user, info) {
    if (err) { return next(err) };
    if (!user) { return res.json({ message: 'Unable to validate facebook credentials' }) };
    req.logIn(user, function (err) {
      if (err) { return next(err) };;
      res.json({ user: user })
    })
  }

  )
}
);


module.exports = router;