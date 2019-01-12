const router = require("express").Router();
const mediaRoutes = require("./media");
const userRoutes = require("./user");
const spotifyRoutes = require("./spotify");
const vgRoutes = require("./vg");
const omdbRoutes = require("./omdb");
const postRoutes = require("./post");

router.use("/media", mediaRoutes);
router.use("/user", userRoutes);
router.use("/spotify", spotifyRoutes);
router.use("/vg", vgRoutes);
router.use("/omdb", omdbRoutes);
router.use("/post", postRoutes);


module.exports = router;