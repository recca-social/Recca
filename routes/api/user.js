const router = require("express").Router();
const userController = require("../../controllers/userController");

//route for creating user
router.route("/create")
.post(userController.create);

//route for finding user by id
router.route("/find/:id")
.get(userController.findUser);

//route for friend requests
router.route("/friend")
.get(userController.userByUserName)
.post(userController.newFriendRequest)
.put(userController.handleFriendRequest)

router.route("/feed/")
.get(userController.getFeed)

module.exports = router;