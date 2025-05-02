// backend/models/index.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// 1. Import each model factory only once
const defineUser   = require("./User");
const defineStore  = require("./Store");
const defineRating = require("./Rating");

// 2. Initialize models
const User   = defineUser(sequelize, DataTypes);
const Store  = defineStore(sequelize, DataTypes);
const Rating = defineRating(sequelize, DataTypes);

// 3. Set up associations in one place
User.hasMany(Rating, { foreignKey: "userId" });
Rating.belongsTo(User, { foreignKey: "userId" });

Store.hasMany(Rating, { foreignKey: "storeId" });
Rating.belongsTo(Store, { foreignKey: "storeId" });

// 4. Export
module.exports = {
  sequelize,
  User,
  Store,
  Rating
};
