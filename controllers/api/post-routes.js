const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// all posts from saved username
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({ // find all posts that apply
      include: [{ model: User, attributes: ["username"] }],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get post by primary key ID
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [ // username and comment
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    if (!postData) { // error message
      res.status(404).json({ message: "Error!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// new post
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({ // create new post
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost); // error message
  } catch (err) {
    res.status(400).json(err);
  }
});

// update post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, { // update post
      where: { id: req.params.id },
    });
    if (!updatedPost) { // error message
      res.status(404).json({ message: "Error!" });
      return;
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    await Comment.destroy({ // delete comments
      where: { post_id: req.params.id },
    });
    const deletedPost = await Post.destroy({
      where: { id: req.params.id },
    });
    if (!deletedPost) { // error message
      res.status(404).json({ message: "Error" });
      return;
    }
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// export router
module.exports = router;
