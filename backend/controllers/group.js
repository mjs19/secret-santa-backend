/** **************************************************************************
 *                                                                          *
 *                           Group Controller:                              *
 *            gets all groups, members of groups, locks a group, and        *
 *                          adds members to a group                         *
 *                                                                          *
 ****************************************************************************/

const express = require('express');
const router = express.Router();
const db = require('../models');

/** **************************************************************************
 *                                                                          *
 *                              Gets all groups                             *
 *                                                                          *
 ****************************************************************************/

// INDEX all groups
router.get('/', (req, res, err) => {
  db.group.findAll({
    attributes: {
      exclude: ['test_password', 'hash', 'salt'],
    },
    include: [{
      model: db.user,
      attributes: {
          exclude: ['password'],
      },
    }],
  })
  .then((groups) => {
    res.status(200).json(groups);
  })
  .catch(function(err) {
    res.json(err);
  });
});

/** **************************************************************************
 *                                                                          *
 *                          Gets a specific group                           *
 *                                                                          *
 ****************************************************************************/

// SHOW a group
router.get('/:id', (req, res, err) => {
  db.group.find({
    where: {
      id: req.params.id,
    },
    attributes: {
      exclude: ['test_password', 'hash', 'salt'],
    },
    include: [{
      model: db.user,
      attributes: {
        exclude: ['test_password', 'hash', 'salt'],
      },
    }],
  })
  .then((group) => {
      res.status(200).json(group);
  })
  .catch(function(err) {
      res.json(err);
  });
});


/** **************************************************************************
 *                                                                          *
 *                 Gets all members from a specific group                   *
 *                                                                          *
 ****************************************************************************/

// SHOW all group memebers
router.get('/:id/members', (req, res, err) => {
  console.log("THIS IS BEING CALLED!!!!")
  db.group.find({
    where: {
      id: req.params.id,
    },
    attributes: {
      exclude: ['test_password', 'hash', 'salt'],
    },
    include: [{
      model: db.user,
      attributes: {
        exclude: ['test_password', 'hash', 'salt'],
      },
    }],
  })
  .then((group) => {
    let members = [];
    group.users.forEach((user) =>{
      members.push(user);
    });
    res.status(200).json(members);
  })
  .catch(function(err) {
      res.json(err);
  });
});


/** **************************************************************************
 *                                                                          *
 *                           Creates a New Group                            *
 *                                                                          *
 ****************************************************************************/

// POST group
// TODO: I assume no hash or salt needed here.
router.post('/new', (req, res, err) => {
  db.group.find({
    where: {
      id: req.body.id,
    },
  })
  .then((result) => {
    if (result) {
      res.json({'result': 'row already exists'});
    } else {
      db.group.create({
        open: req.body.open,
        photo_url: req.body.photo_url,
        name: req.body.name,
        description: req.body.description,
        price_min: req.body.price_min,
        test_password: req.body.test_password,
        owner_id: req.body.owner_id,
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
 *                                Edit A Group                              *
 *                                                                          *
 ****************************************************************************/

router.put('/', (req, res, err) => {
  db.group.find({
    where: {
      id: req.body.id,
    },
  })
  .then((group) => {
    group.update({
      open: req.body.open,
      photo_url: req.body.photo_url,
      name: req.body.name,
      description: req.body.description,
      price_min: req.body.price_min,
      test_password: req.body.test_password,
      owner_id: req.body.owner_id,
      updatedAt: new Date(),
    })
    .then((groupUpdated) => {
      res.status(200).json({'groupUpdated': groupUpdated});
    });
  })
  .catch(function(err) {
    res.json(err);
  });
});


/** **************************************************************************
 *                                                                          *
 *                            Removes a Group                               *
 *                                                                          *
 ****************************************************************************/

router.delete('/', (req, res, err) => {
  db.group.destroy({
    where: {
      id: req.body.id,
    },
  })
  .then((groupDestroyed) => {
    res.status(200).json({'groupDestroyed': groupDestroyed});
  })
  .catch(function(err) {
    res.json(err);
  });
});
module.exports = router;

/** **************************************************************************
 *                                                                          *
 *            Creates Santa Matches for all Members in a Group              *
 *                                                                          *
 ****************************************************************************/

router.get('/:id/done', (req, res, err) => {
  db.group.find({
    where: {
      id: req.params.id,
    },
    attributes: {
      exclude: ['test_password', 'hash', 'salt'],
    },
    include: [{
      model: db.user,
      attributes: {
        exclude: ['test_password', 'hash', 'salt'],
      },
    }],
  })
  .then((group) => {
    let members = [];
      group.users.forEach((user) =>{
        members.push(user.id);
      });
      // Shuffles all members
      let currentIndex = members.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = members[currentIndex];
        members[currentIndex] = members[randomIndex];
        members[randomIndex] = temporaryValue;
      }

      // creates array of objects holding a user and their giftee
      let santas = [];
      for (let i = 0; i < members.length -1; i++) {
        curr = {
          member: members[i],
          giftee: members[i+1],
        };
        santas.push(curr);
      }
      curr = {
        member: members[members.length -1],
        giftee: members[0],
      };
      santas.push(curr);
      santas.forEach((santa) => {
        db.user.findById(santa.member)
        .then((user) => {
          user.update({
            giftee_id: santa.giftee,
          });
        });
      });
  })
  .then((group) => {
    res.status(200).json('every group member has a unique santa');
  })
  .catch(function(err) {
      res.json(err);
  });
});

/** **************************************************************************
 *                                                                          *
 *                        Adds a User to a Group                            *
 *                                                                          *
 ****************************************************************************/

 router.post('/:id/addUser', (req, res, err) => {
   db.group.find({
     where: {
       id: req.params.id,
     },
     attributes: {
       exclude: ['test_password', 'hash', 'salt'],
     },
     include: [{
       model: db.user,
       attributes: {
         exclude: ['test_password', 'hash', 'salt'],
       },
     }],
   })
   .then((group) => {
     db.userGroup.create({
       userId: req.body.user_id,
       groupId: group.id,
     })
     .then((user) => {
       res.status(200).json(user);
     });
   });
 });


 // router.post('/:id/addUser', (req, res, err) => {
 //   db.group.find({
 //     where: {
 //       id: req.params.id,
 //     },
 //     attributes: {
 //       exclude: ['test_password', 'hash', 'salt'],
 //     },
 //     include: [{
 //       model: db.user,
 //       attributes: {
 //         exclude: ['test_password', 'hash', 'salt'],
 //       },
 //     }],
 //   })
 //   .then(group => {
 //     db.userGroup.create({
 //       userId: req.user.id,
 //       groupId: group.id
 //     })
 //     .then(user => {
 //       res.status(200).json(user);
 //     })
 //   })
 // })


/** **************************************************************************
 *                                                                          *
 *                       Removes a User From a Group                        *
 *                                                                          *
 ****************************************************************************/

 router.delete('/:name/deleteUser/:email', (req, res, err) => {
   console.log('IN DELETE USER');
   db.group.find({
     where: {
       name: req.params.name,
     },
     include: [{
       model: db.user,
     }],
   })
   .then((group) => {
     db.user.destroy({
       where: {
         email: req.params.email,
       },
     })
     .then(() => {
       res.json({message: 'deleted'});
     })
     .catch((err) => {
       res.status(500).json(err);
     });
   });
 });

 // router.delete('/:name/deleteUser', (req, res, err) => {
 //   console.log("IN DELETE USER");
 //   db.group.find({
 //     where: {
 //       name: req.params.name,
 //     },
 //     attributes: {
 //       exclude: ['test_password', 'hash', 'salt'],
 //     },
 //     include: [{
 //       model: db.user,
 //       attributes: {
 //         exclude: ['test_password', 'hash', 'salt'],
 //       },
 //     }],
 //   })
 //   .then(group => {
 //     db.userGroup.findOne({
 //       where: {
 //         groupId: group.id,
 //         userId: req.user.id
 //       }
 //     })
 //     .then(user => {
 //       user.destroy();
 //     })
 //     .then(() => {
 //       res.json({ message: 'deleted' });
 //     })
 //     .catch(err => {
 //       res.status(500).json(err);
 //     });
 //   })
 // })
