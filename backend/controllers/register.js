var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET /register */
router.get('/', function(req, res, next) {
  res.render('register', {message: req.flash('signupMessage')});
});

/* POST /register */
router.post('/', passport.authenticate('local-signup'), (req, res) => {
  res.json(req.user);
});

module.exports = router;
