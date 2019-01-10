const router = require("express").Router();
const mediaRoutes = require("./media");
const userRoutes = require("./user");
const spotifyRoutes = require("./spotify");
const vgRoutes = require("./vg");
const omdbRoutes = require("./ombd")

router.use("/media", mediaRoutes);
router.use("/user", userRoutes);
router.use("/spotify", spotifyRoutes);
router.use("/vg", vgRoutes);
router.use("/omdb", omdbRoutes);


module.exports = router;