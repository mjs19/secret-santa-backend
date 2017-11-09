/** **************************************************************************
 *                                                                          *
 *                           User Controller:                               *
 *      gets all users, gets specific user, gets user by email, adds user,  *
 *                        edits user, and deletes user                      *
 *                                                                          *
 *****************************************************************************/

const express = require('express');
var passport = require('passport');
const router = express.Router();
const db = require('../models');

var ensureLoggedIn = (req, res, next) => {
  // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        {
return next();
}

    // if they aren't redirect them to the login page
    res.redirect('/login');
};


/** **************************************************************************
 *                                                                          *
 *                              Gets All Users                              *
 *                                                                          *
 ****************************************************************************/
// INDEX all users
router.get('/all', (req, res, err) => {
  db.user.findAll({
    attributes: {
      exclude: ['test_password', 'hash', 'salt'],
    },
    include: [{
      model: db.group
    }],
  })
  .then((users) => {
    res.status(200).json(users);
  })
  .catch(function(err) {
    res.json(err);
  });
});

/** **************************************************************************
 *                                                                          *
 *                           Gets specific User                             *
 *                                                                          *
 ****************************************************************************/
// SHOW a user based on loggedIn; includes group
router.get('/santa/:id', (req, res, err) => {
  db.user.find({
    where: {
      giftee_id: req.params.id,
    },
    attributes: {
      exclude: ['test_password', 'hash', 'salt'],
    },
    include: [{
      model: db.group,
      attributes: {
        exclude: ['test_password', 'hash', 'salt'],
      },
    }],
  })
  .then((user) => {
    res.status(200).json(user);
  })
  .catch(function(err) {
    res.json(err);
  });
});




/** **************************************************************************
 *                                                                          *
 *                           Gets specific User                             *
 *                                                                          *
 ****************************************************************************/
// SHOW a user based on loggedIn; includes group
// TODO: need req.user from passport to work, add isLoggidIn
router.get('/', (req, res, err) => {
  db.user.find({
    where: {
      email: req.body.email,
    },
    attributes: {
      exclude: ['test_password', 'hash', 'salt'],
    },
    include: [{
      model: db.group,
      attributes: {
        exclude: ['test_password', 'hash', 'salt'],
      },
    }],
  })
  .then((user) => {
    res.status(200).json(user);
  })
  .catch(function(err) {
    res.json(err);
  });
});







/** **************************************************************************
 *                                                                          *
 *                          Get User by Email                               *
 *                                                                          *
 ****************************************************************************/
// SHOW a user; include group
router.get('/:email', (req, res, err) => {
  db.user.find({
    where: {
      email: req.params.email,
    },
    attributes: {
      exclude: ['test_password', 'hash', 'salt'],
    },
    include: [{
      model: db.group,
      attributes: {
        exclude: ['test_password', 'hash', 'salt'],
      },
    }],
  })
  .then((user) => {
    res.status(200).json(user);
  })
  .catch(function(err) {
    res.json(err);
  });
});

/** **************************************************************************
 *                                                                          *
 *                               Get User by ID                             *
 *                                                                          *
 ****************************************************************************/

 router.get('/id/:id', (req, res, err) => {
   db.user.find({
     where: {
       id: req.params.id,
     },
     attributes: {
       exclude: ['test_password', 'hash', 'salt'],
     },
     include: [{
       model: db.group,
       attributes: {
         exclude: ['test_password', 'hash', 'salt'],
       },
     }],
   })
   .then((user) => {
     res.status(200).json(user);
   })
   .catch(function(err) {
     res.json(err);
   });
 });


/** **************************************************************************
 *                                                                          *
 *                            Creates New User                              *
 *                                                                          *
 ****************************************************************************/
// POST user
// TODO: I'm assuming salt and hash are not included here
router.post('/', (req, res, err) => {
  db.user.find({
    where: {
      email: req.body.email,
    },
  })
  .then((result) => {
    if (result) {
      res.json({'result': 'row already exists'});
    } else {
      db.user.create({
        f_name: req.body.f_name,
        l_name: req.body.l_name,
        interests: req.body.interests,
        photo_url: req.body.photo_url,
        email: req.body.email,
        password: req.body.password,
        santa_id: req.body.santa_id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .then((result) => {
        res.json({'result': 'row created!!!!'});
      });
    }
  });
});


/** **************************************************************************
 *                                                                          *
 *                              Updates a User                              *
 *                                                                          *
 ****************************************************************************/
// PUT user
router.put('/', (req, res, err) => {
  db.user.find({
    where: {
      id: req.body.id,
    },
  })
  .then((user) => {
    user.update({
      f_name: req.body.user.f_name,
      l_name: req.body.user.l_name,
      interests: req.body.user.interests,
      photo_url: req.body.user.photo_url,
      email: req.body.user.email,
      test_password: req.body.user.test_password,
      santa_id: req.body.user.santa_id,
      updatedAt: new Date(),
    })
    .then((userUpdated) => {
      res.status(200).json({'userUpdated': userUpdated});
    });
  })
  .catch(function(err) {
    res.json(err);
  });
});

/** **************************************************************************
 *                                                                          *
 *                               Deletes a User                             *
 *                                                                          *
 ****************************************************************************/
// DELETE user
router.delete('/:id', (req, res, err) => {
  db.user.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((userDestroyed) => {
    res.status(200).json({'userDestroyed': userDestroyed});
  })
  .catch(function(err) {
    res.json(err);
  });
});

module.exports = router;


/** **************************************************************************
 *                                                                          *
 *               Returns a List of Groups a User Belongs to                 *
 *                                                                          *
 ****************************************************************************/

router.get('/:id/groups', (req, res, err) => {
  db.user.find({
    where: {
      id: req.params.id
    },
    attributes: {
      exclude: ['test_password', 'hash', 'salt'],
    },
    include: [{
      model: db.group,
      attributes: {
        exclude: ['test_password', 'hash', 'salt'],
      }
    }]
  })
  .then((member) => {
    var joinedGroups = [];
    member.groups.forEach(group => {
      joinedGroups.push(group);
    })
    res.status(200).json(joinedGroups);
  })
  .catch(function(err) {
    res.json(err)
  })
})
