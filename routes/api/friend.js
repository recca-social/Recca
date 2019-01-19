const router = require("express").Router();
const friendController = require("../../controllers/friendController");

//route for friend requests
router.route("/")
.get(friendController.pendingRequest)
.post(friendController.newFriendRequest)
.put(friendController.handleFriendRequest)
.delete(friendController.removeFriend);

router.route("/remove")
.put(friendController.removeFriend);

//route for finding user by username
router.route("/find")
.post(friendController.userByName);

module.exports = router