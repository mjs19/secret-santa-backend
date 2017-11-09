var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var flash = require('connect-flash');
var db = require('../models');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    console.log('IN SERIALIZE');
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    db.user.findById(id)
      .then(function(user) {
      if (user == null) {
        done(new Error('Wrong user id.'));
      }
      done(null, user.dataValues);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
  },
  (req, username, password, done) => {
      db.user.findOne({
        where: {email: username},
      })
      .then((user) => {
        if (user) {
          return done('user exists', user);
        } else {
          let pwd = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
          db.user.create({
            password: pwd,
            email: username,
            f_name: req.body.f_name,
            l_name: req.body.l_name,
            interests: req.body.interests,
            photo_url: req.body.photo_url,
          })
          .then((newUser) => {
            return done(null, newUser);
          });
        }
      })
      .catch((err) => {
        if (err) {
return done(null, false, {message: 'Uh oh. Something went wrong.'});
}
      });
  }));
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    db.user.findOne({
      where: {email: username},
    })
    .then((user, err) => {
      if (!user) {
return done(null, false, req.flash('loginMessage', 'Username not found'));
}
      if (!user.validPassword(password)) {
return done(null, false, req.flash('loginMessage', 'Sike! Thats the wrong password!'));
}
      return done(null, user);
    });
  }));
};
