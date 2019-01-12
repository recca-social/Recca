const router = require("express").Router();
const userController = require("../../controllers/userController");

//route for creating user
router.route("/create")
.post(userController.create);

//route for finding user by id
router.route("/find/:id")
.get(userController.findUser);

router.route("/friend/add/:id")
.post(userController.addFriend);

module.exports = router;