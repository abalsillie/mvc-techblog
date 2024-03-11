// import modules
const router = require("express").Router();
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");

// routes
router.use("/users", userRoutes); // user data
router.use("/posts", postRoutes); // post data
router.use("/comments", commentRoutes); // comment data

// export
module.exports = router;
