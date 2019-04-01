'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('recipes', [{
        title: 'Your Title Here...',
        description: 'Subtitle..',
        image: 'Url',
        body: 'Your story goes here...'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
     */
      return queryInterface.bulkDelete('recipes', null, {});
  }
};
