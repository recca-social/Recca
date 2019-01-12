const router = require("express").Router();
const postController = require("../../controllers/postController");

router.route("/create/:id")
.post(postController.create);