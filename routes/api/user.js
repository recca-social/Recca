const router = require("express").Router();
const userController = require("../../controllers/userController");

//route for creating user
router.route("/create")
.post(userController.create);

//route for finding user by id
router.route("/find")
.get(userController.findUser)

router.route("/feed/")
.get(userController.getFeed);

router.route("/getFeedItems/")
.get(userController.getFeedItems);
module.exports = router;