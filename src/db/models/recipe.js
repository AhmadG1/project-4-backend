'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING
  }, { tableName: 'recipes' });
  Recipe.associate = function(models) {
    // associations can be defined here
    Recipe.belongsTo(models.User);
  };
  return Recipe;
};