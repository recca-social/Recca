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

router.route("/facebook").get(passport.authenticate('facebook', { scope: 'public_profile' }));

router.route("/facebook/callback").get(passport.authenticate('facebook-auth', { successRedirect:"/", failureRedirect: '/login' }));


module.exports = router;