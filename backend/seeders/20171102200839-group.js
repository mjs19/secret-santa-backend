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
    open:boolean,photo_url:string,name:string,description:string,price_max:integer,password:string,owner_id:integer
    */
    return queryInterface.bulkInsert('groups', [
      {
        open: true,
        photo_url: 'https://res.cloudinary.com/uktv/image/upload/v1377099319/qgswr6ddtgdg5m2n3lkc.jpg',
        name: 'Mock Group',
        description: 'The best group, really good, really, it\'s huuuuge!',
        price_min: 20,
        test_password: 'Mock',
        hash: '',
        salt: '',
        owner_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        open: true,
        photo_url: 'http://travelwithgrant.boardingarea.com/wp-content/uploads/2017/04/marvelsagentsofshieldsofar.0114.jpg',
        name: 'Capital One',
        description: 'Don\'t even ask!',
        price_min: 100,
        test_password: 'Capital',
        hash: '',
        salt: '',
        owner_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        open: true,
        photo_url: 'https://mobilemarketingwatch.com/wp-content/uploads/2016/03/Amazon-Ready-to-Embrace-VR-Says-New-Report.png',
        name: 'Amazon',
        description: 'We made the cloud! We print money!!!',
        price_min: 200,
        test_password: 'Mock',
        hash: '',
        salt: '',
        owner_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('groups', null, {});
  },
};
