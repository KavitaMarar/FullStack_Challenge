
const Store = require("../models/Store");
const Rating = require("../models/Rating");
const bcrypt = require("bcryptjs");
const { User } = require("../models");


exports.addUser = async (req, res) => {
  const { name, email, address, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, address, password: hashedPassword, role });
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addStore = async (req, res) => {
  const { name, email, address } = req.body;
  try {
    await Store.create({ name, email, address });
    res.status(201).json({ message: "Store created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const users = await User.count();
    const stores = await Store.count();
    const ratings = await Rating.count();
    res.json({ totalUsers: users, totalStores: stores, totalRatings: ratings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "address", "role"]
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      include: [{ model: Rating, attributes: ["rating"] }]
    });

    const storesWithAvg = stores.map(store => {
      const ratings = store.Ratings;
      const avg = ratings.length > 0 ? (ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length).toFixed(1) : 0;
      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        rating: avg
      };
    });

    res.json(storesWithAvg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
