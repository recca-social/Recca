const router = require("express").Router();
const passport = require("../../config/passportConfig")



router.route("/local").post(function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        console.log("we're logged in")
        return res.status(200);
      });
    })(req, res, next);
})


module.exports = router;