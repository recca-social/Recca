const router = require("express").Router();
const mediaRoutes = require("./media");
const userRoutes = require("./user");
const spotifyRoutes = require("./spotify");

router.use("/media", mediaRoutes);
router.use("/user", userRoutes);
router.use("/spotify", spotifyRoutes);


module.exports = router;