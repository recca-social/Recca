const router = require("express").Router();
const omdbController = require("../../controllers/ombdController");

router.route("/show/search/:query")
.get(omdbController.searchSeries);

router.route("/movie/search/:query")
.get(omdbController.searchMovies);

module.exports = router;