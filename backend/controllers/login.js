var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET /login */
router.get('/', function(req, res) {
  res.render('login', {message: req.flash('loginMessage')});
});

/* POST /login */
router.post('/', passport.authenticate('local-login'), (req, res) => {
  res.json(req.user);
});

module.exports = router;
