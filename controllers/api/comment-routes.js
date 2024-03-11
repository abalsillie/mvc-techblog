// import modules
const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// new comment
router.post("/", withAuth, async (req, res) => {
  try {
    // create a new comment
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    // response with the new comment data
    res.status(200).json(newComment);
  } catch (err) {
    // error response
    res.status(400).json(err);
  }
});

// export router
module.exports = router;
