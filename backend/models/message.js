'use strict';
module.exports = (sequelize, DataTypes) => {
  var message = sequelize.define('message', {
    sender_id: DataTypes.INTEGER,
    target_id: DataTypes.INTEGER,
    text: DataTypes.STRING
  });

    message.associate = function(models) {
        // associations can be defined here
        // message.belongsTo(models.user, {foreignKey: 'sender_id'});
        // message.belongsTo(models.user, {foreignKey: 'target_id'});
        }
  return message;
};
