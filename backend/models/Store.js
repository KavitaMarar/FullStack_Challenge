// backend/models/Store.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Store", {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    address: {
      type: DataTypes.STRING(400),
      allowNull: false
    }
  }, {
    timestamps: true
  });
};
