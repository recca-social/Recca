const router = require("express").Router();
const loginRoutes = require("./loginRoutes/loginRoutes")
const apiRoutes = require("./api");

 //API Routes
 router.use("/api", apiRoutes);

// Login Routes "http:localhost:3001/login"
router.use("/login", loginRoutes)

//Logout Routes "http:localhost:3001/logout"
router.route("/logout").get(function(req, res){
  req.session.destroy();
  req.logout();
  res.redirect("/login");
});

module.exports = router;
