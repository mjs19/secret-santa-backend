var express = require('express');
var passport = require('passport');
var router = express.Router();

var ensureLoggedIn = (req, res, next) => {
  // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the login page
    res.redirect('/');
}

// GET /logout
router.get('/', ensureLoggedIn, (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
