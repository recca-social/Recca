const router = require("express").Router();
const postController = require("../../controllers/postController");

router.route("/create/")
.post(postController.create);

module.exports = router;