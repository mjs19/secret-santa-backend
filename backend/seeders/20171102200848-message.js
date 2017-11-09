'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    sender_id:integer,target_id:integer,text:string
    */
    return queryInterface.bulkInsert('messages', [
      {
        sender_id: 1,
        target_id: 2,
        text: "Dude, I'm your secret santa!!!!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sender_id: 2,
        target_id: 1,
        text: "You're a moron!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sender_id: 1,
        target_id: 2,
        text: "Hum?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sender_id: 2,
        target_id: 3,
        text: "I'm your secret santa, what up?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sender_id: 3,
        target_id: 2,
        text: "Oh, hey!!!!! You're the best!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sender_id: 3,
        target_id: 1,
        text: "I know who you are.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sender_id: 1,
        target_id: 3,
        text: "I know where you sleep.",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('messages', null, {});
  }
};
