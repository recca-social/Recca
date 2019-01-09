const router = require("express").Router();
const spotifyController = require("../../controllers/spotifyController");

router.route("/search/album/:query")
.get(spotifyController.searchAlbum);

module.exports = router;