const router = require("express").Router();
const passport = require("../../config/passportConfig")

router.route("/local").post(function (req, res, next) {
  passport.authenticate('local-login', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      console.log("we're logged in")
      return res.status(200);
    });
  })(req, res, next);
});

router.route("/signup").post(function (req, res, next) {
  passport.authenticate('local-signup', function (err, user, info) {
    if (err) { return next(err) };
    if (!user) { return res.redirect('/signup') };
    req.logIn(user, function (err) {
      if (err) { return next(err) }
      console.log("successful login")
      res.redirect('/');
    });
  })(req, res, next);
})

router.route("/facebook").get(passport.authenticate("facebook-auth"));

router.route("/facebook/callback").get(function (req, res, next) {
  passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
      res.redirect('/');
    }
});


module.exports = router;