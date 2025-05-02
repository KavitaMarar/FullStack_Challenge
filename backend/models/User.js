// backend/models/User.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    name:    DataTypes.STRING,
    email:   DataTypes.STRING,
    address: DataTypes.STRING,
    password:DataTypes.STRING,
    role:    DataTypes.STRING,
  });
};
