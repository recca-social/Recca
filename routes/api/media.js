const router = require("express").Router();
const mediaController = require("../../controllers/mediaController");

//route for creating new media
router.route("/create/")
.post(mediaController.create);

//route for deleting events
router.route("/delete/:id")
.delete(mediaController.delete);

//route for toggling active item
router.route("/active/:id")
.get(mediaController.toggleActive);

//route for toggling complete
router.route("/complete/:id")
.get(mediaController.toggleComplete);


module.exports = router;