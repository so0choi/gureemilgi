const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
  });

  User.prototype.dateFormat = (date) => moment(date).format("YYYY-MM-DD");

  return User;
};
