/*****************************************************************************
 *                                                                           *
 *                         Messages Controller:                              *
 *      gets and adds messages from the user to their santa and giftee       *
 *                                                                           *
 *****************************************************************************/

const express = require('express');
const router = express.Router();
const db = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/****************************************************************************
 *                                                                          *
 *             Gets all messages between user and their giftee              *
 *                                                                          *
 ****************************************************************************/

 //hardcoded version
router.get('/giftee/:id', (req, res, err) => {
  db.user.findById(req.params.id)
  .then(user => {
    db.message.findAll({
      where: {
        [Op.or]: [{
          sender_id: user.id,
          target_id: user.giftee_id
        },
        {
          sender_id: user.giftee_id,
          target_id: user.id
        }]
      },
      attributes: {
        exclude: ['test_password', 'hash', 'salt'],
      }
    })
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch(function(err) {
      res.json(err);
    });
  })

});

//version with user.id

// router.get('/giftee', (req, res, err) => {
//   db.message.findAll({
//     where: {
//       [Op.or]: [{
//         sender_id: req.user.id,
//         target_id: req.user.giftee_id
//       },
//       {
//         sender_id: req.user.giftee_id,
//         target_id: req.user.id
//       }]
//     },
//     attributes: {
//       exclude: ['test_password', 'hash', 'salt'],
//     }
//   })
//   .then((messages) => {
//     res.status(200).json(messages);
//   })
//   .catch(function(err) {
//     res.json(err);
//   });
// });


/****************************************************************************
 *                                                                          *
 *             Gets all messages between user and their santa               *
 *                                                                          *
 ****************************************************************************/


//hardcoded version
router.get('/santa/:id', (req, res, err) => {
  db.user.findById(req.params.id)
  .then(user => {
    db.user.find({
      where: {
        giftee_id: user.id
      }
    })
    .then(santa => {
      db.message.findAll({
        where: {
          [Op.or]: [{
            sender_id: user.id,
            target_id: santa.id
          },
          {
            sender_id: santa.id,
            target_id: user.id
          }]
        },
        attributes: {
          exclude: ['test_password', 'hash', 'salt'],
        }
      })
      .then((messages) => {
        res.status(200).json(messages);
      })
    })
    .catch(function(err) {
      res.json(err);
    });
  })

});

//version with user.id
// router.get('/santa', (req, res, err) => {
//   db.user.find({
//     where: {
//       giftee_id: req.user.id
//     }
//   })
//   .then(santa => {
//     db.message.findAll({
//       where: {
//         [Op.or]: [{
//           sender_id: req.user.id,
//           target_id: santa.id
//         },
//         {
//           sender_id: santa.id,
//           target_id: req.user.id
//         }]
//       },
//       attributes: {
//         exclude: ['test_password', 'hash', 'salt'],
//       }
//     })
//     .then((messages) => {
//       res.status(200).json(messages);
//     })
//   })
//   .catch(function(err) {
//     res.json(err);
//   });
// });

/****************************************************************************
 *                                                                          *
 *            Posts a Message from the user to the database                 *
 *                                                                          *
 ****************************************************************************/

router.post('/addMessage', (req, res, err) => {
  db.message.create({
    sender_id: req.body.sender_id,
    target_id: req.body.target_id,
    text: req.body.text
  })
  .then(message => {
    res.status(200).json(message);
  })
})


module.exports = router;
