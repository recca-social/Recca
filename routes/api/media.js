const router = require("express").Router();
const mediaController = require("../../controllers/mediaController");

//route for creating new media
router.route("/create/:id")
.post(mediaController.create);

//route for deleting events
router.route("/delete/:id")
.delete(mediaController.delete);

//route for toggling active item
router.route("/active/:id")
.get(mediaController.toggleActive);

//route for toggling completed
router.route("/completed/:id")
.get(mediaController.toggleComplete);

router.route("/recommend/:id")
.get(mediaController.setRecommend);

module.exports = router;