'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("recipes", "user_id",  
    { 
       type: Sequelize.INTEGER,
    onDelete: "CASCADE",
    references: {
      model: "users"
    } });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("recipes", "user_id");
  }
};
