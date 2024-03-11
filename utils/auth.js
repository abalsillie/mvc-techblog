const withAuth = (req, res, next) => { // middleware checking for login
  if (!req.session.logged_in) { // user is not logged in then redirect to login
    res.redirect("/login");
  } else {
    next(); // else, continue
  }
};

module.exports = withAuth; // exporting middleware
