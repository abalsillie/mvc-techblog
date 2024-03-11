// import models
const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// render homepage route
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({ // find all posts that apply
      include: [{ model: User, attributes: ["username"] }],
    });
    const posts = postData.map((post) => post.get({ plain: true })); // create js object
    res.render("homepage", { // render homepage
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) { // error message
    res.status(500).json(err);
  }
});
// render post routes
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, { // find post by primary key ID
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    const post = postData.get({ plain: true }); // create js object
    res.render("post", { // render post data and login status
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) { // error message
    res.status(500).json(err);
  }
});

// render dashboard page
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({ // find all posts by username
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ["username"] }],
    });
    const posts = postData.map((post) => post.get({ plain: true })); // create js object
    res.render("dashboard", { // render to dashboard
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => { // render login
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => { // render sign up
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});

router.get("/newpost", (req, res) => { // render new post
  if (req.session.logged_in) {
    res.render("newpost");
    return;
  }
  res.redirect("/login");
});

router.get("/editpost/:id", async (req, res) => { // render edit post
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    const post = postData.get({ plain: true });  // create js object
    res.render("editpost", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) { // catch error
    res.status(500).json(err);
  }
});

// module exports router
module.exports = router;
