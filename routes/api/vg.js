const router = require("express").Router();
const vgController = require("../../controllers/vgController");

router.route("/search/:query")
.get(vgController.search);

module.exports = router;