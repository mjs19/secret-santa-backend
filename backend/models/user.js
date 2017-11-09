'use strict';
var bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  let user = sequelize.define('user', {
    f_name: DataTypes.STRING,
    l_name: DataTypes.STRING,
    interests: DataTypes.JSON,
    photo_url: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    giftee_id: DataTypes.INTEGER
  });

  user.associate = function(models) {
    user.belongsToMany(models.group, {through: 'userGroups'});
    // user.hasMany(models.message);
  };

  user.prototype.generateHash = (pwd) => {
    return bcrypt.hashSync(pwd, bcrypt.genSaltSync(10), null);
  }

  user.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }

  return user;
};
