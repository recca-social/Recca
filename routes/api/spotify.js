const router = require("express").Router();
const spotifyController = require("../../controllers/spotifyController");

router.route("/:query")
.get(spotifyController.search)

module.exports = router;