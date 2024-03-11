// import modules
const router = require("express").Router();
const { User } = require("../../models");

// route for users
router.get("/", (req, res) => {
  User.findAll({ // find all users
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData)) // compare user data
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// sign up route
router.post("/signup", async (req, res) => {
  try {
    const newUser = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    const userData = await newUser.save(); // new user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

// log in route
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } }); // find username
    if (!userData) {
      res
        .status(400)
        .json({ message: "Error" }); // if empty, show error
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password); // check password
    if (!validPassword) { // if password not valid, show error
      res
        .status(400)
        .json({ message: "Error" });
      return;
    }
    req.session.save(() => { // otherwise save session and show success message
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res
        .status(200)
        .json({ user: userData, message: "Success" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// log out route
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// export router
module.exports = router;
