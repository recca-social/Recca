const router = require("express").Router();
const mediaController = require("../../controllers/mediaController");

//route for creating new media
router.route("/create/:id")
.post(mediaController.create);

//route for deleting events
router.route("/delete/:id")
.delete(mediaController.delete);

router.route("/active/:id")
.get(mediaController.toggleActive);

router.route("/completed/:id")
.get(mediaController.toggleComplete);

module.exports = router;