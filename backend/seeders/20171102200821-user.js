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
    f_name: string, l_name: string, interests: array: string, photo_url: string, email: string, password: string, giftee_id: integer
    */
    return queryInterface.bulkInsert('users', [
      {
        f_name: 'Mary',
        l_name: 'Jane',
        interests: JSON.stringify(['Video Games', 'Guitars', 'Harry Potter']),
        photo_url: 'https://peopledotcom.files.wordpress.com/2016/11/arnold-schwarzenegger.jpg?w=1514&h=2000',
        email: 'Mary.Jane@gmail.com',
        password: 'Jane',
        giftee_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        f_name: 'Tim',
        l_name: 'Kane',
        interests: JSON.stringify(['Programming', 'Soccer', 'Cats']),
        photo_url: 'http://i.dailymail.co.uk/i/pix/2015/05/26/00/2912301F00000578-0-He_ll_be_back_Arnold_Schwarzenegger_will_return_as_Conan_the_Bar-m-28_1432595777556.jpg',
        email: 'Tim.Kane@gmail.com',
        password: 'Kane',
        giftee_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        f_name: 'Martha',
        l_name: 'Mitchell',
        interests: JSON.stringify(['Yoga', 'Cameras', 'Snowboarding']),
        photo_url: 'http://timothywhite.com/sites/default/files/images/portfolio/arnoldschwarzenegger-headshot-bw.jpg?height=80%',
        email: 'Martha.Mitchell@gmail.com',
        password: 'Kane',
        giftee_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        f_name: 'Jimmy',
        l_name: 'John',
        interests: JSON.stringify(['Video Games', 'Guitars', 'Harry Potter']),
        photo_url: 'https://strengthawakening.com/wp-content/uploads/2016/09/1970-Arnold-1.jpg',
        email: 'Jimmy.John@gmail.com',
        password: 'John',
        giftee_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        f_name: 'Susy',
        l_name: 'Lockett',
        interests: JSON.stringify(['Video Games', 'Guitars', 'Harry Potter']),
        photo_url: 'https://bloximages.chicago2.vip.townnews.com/tucson.com/content/tncms/assets/v3/editorial/c/27/c2768ae0-4f0d-11e4-9aa1-4bbec1208061/54356f9c5b974.image.jpg?resize=1200%2C750',
        email: 'Susy.Lockett@gmail.com',
        password: 'Lockett',
        giftee_id: 4,
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
    return queryInterface.bulkDelete('users', null, {});
  },
};
