const router = require("express").Router();
const userController = require("../../controllers/userController");

//route for creating user
router.route("/create")
.post(userController.create);

//route for finding user by id
router.route("/find/:id")
.get(userController.findUser);

<<<<<<< HEAD
router.route("/friend")
.get(userController.userByUserName)
.post(userController.newFriendRequest)
.put(userController.handleFriendRequest)
=======
router.route("/friend/add/:id")
.post(userController.addFriend);

router.route("/feed/")
.get(userController.getFeed)
>>>>>>> 4f0bea122bb07738417276ae924482419e99bebe

module.exports = router;