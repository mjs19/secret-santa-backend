'use strict';
module.exports = (sequelize, DataTypes) => {
  let group = sequelize.define('group', {
    open: DataTypes.BOOLEAN,
    photo_url: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price_min: DataTypes.INTEGER,
    test_password: DataTypes.STRING,
    hash: DataTypes.STRING,
    salt: DataTypes.STRING,
    owner_id: DataTypes.INTEGER,
  });

  group.associate = function(models) {
        // associations can be defined here
        group.belongsToMany(models.user, {through: 'userGroups'});
  };

// TODO: I imagine groups will need the same treatment as users

  return group;
};
