const router = require("express").Router();
const mediaRoutes = require("./media");
const userRoutes = require("./user");

router.use("/media", mediaRoutes);
router.use("/user", userRoutes);

module.exports = router;