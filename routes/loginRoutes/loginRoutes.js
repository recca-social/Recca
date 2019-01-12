const router = require("express").Router();
const passport = require("../../config/passportConfig")

router.route("/check").get(function(req, res){
  if(req.user){
    res.json({isLoggedIn:true});
  } else {
    res.json({isLoggedIn:false})
  }
})

router.route("/local").post(function (req, res, next) {
  passport.authenticate('local-login', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.json({message:'Username or password are incorrect'}); }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      console.log("we're logged in")
      console.log(user)
      req.session.userId =user._id;
      req.session.save();
      return res.json({user:user});
    });
  })(req, res, next);
});

router.route("/signup").post(function (req, res, next) {
  passport.authenticate('local-signup', function (err, user, info) {
    if (err) { return next(err) };
    if (!user) { return res.json({message:'Username in use, please try again'}) };
    req.logIn(user, function (err) {
      if (err) { return next(err) }
      console.log("successful login")
      req.session.save({userId:user._id})
      res.json({user:user});
    });
  })(req, res, next);
})

router.route("/facebook").get(passport.authenticate('facebook', { scope: 'public_profile' }));

router.route("/facebook/callback").get(function (req, res, next) {
  passport.authenticate('facebook-auth', function(err, user, info) {
    if(err) {return next(err)};
    if (!user) {return res.json({message: 'Unable to validate facebook credentials'})};
    req.logIn(user, function (err){
      if (err) {return next(err)};
      req.session.save({userId: user._id});
      res.json({user:user})
    })
  }
  
  )}
  );


module.exports = router;