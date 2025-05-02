// backend/models/Rating.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Rating", {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 }
    }
  }, {
    timestamps: true
  });
};
