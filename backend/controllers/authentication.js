var passport = require('passport');
var db = require('../models');

module.exports.register = function(req, res) {
  db.user.create({
    f_name: req.body.fname,
    l_name: req.body.lname,
    email: req.body.email,
  });

  db.user.setPassword(req.body.password);

  db.user.save(function(err) {
    let token;
    token = db.user.generateJwt();
    res.status(200);
    res.json({
      'token': token,
    });
  });
};

module.exports.login = function(req, res) {
  passport.authenticate('local', function(err, usr, info) {
    let token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (usr) {
      token = usr.generateJwt();
      res.status(200);
      res.json({
        'token': token,
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};
