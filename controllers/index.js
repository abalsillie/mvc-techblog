// import modules
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");

// api routes
router.use("/api", apiRoutes);
router.use("/", homeRoutes);

// export router
module.exports = router;
