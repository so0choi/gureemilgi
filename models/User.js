const moment = require("moment");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, validate: { isEmail: true } },
      password: { type: DataTypes.STRING },
      description: { type: DataTypes.TEXT },
    },
    { sequelize, modelName: "User" }
  );

  User.prototype.dateFormat = (date) => moment(date).format("YYYY-MM-DD");

  return User;
};
