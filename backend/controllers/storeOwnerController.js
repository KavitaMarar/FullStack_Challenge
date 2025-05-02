const Store = require("../models/Store.js");
const Rating = require("../models/Rating.js");
const { User } = require("../models");


exports.getStoreRatings = async (req, res) => {
  try {
    const store = await Store.findOne({
      where: { email: req.user.email }, // or another way to link owner to store
      include: {
        model: Rating,
        include: { model: User, attributes: ["name", "email"] }
      }
    });

    if (!store) return res.status(404).json({ message: "Store not found" });

    const ratings = store.Ratings.map(r => ({
      id: r.id,
      rating: r.rating,
      user: r.User.name,
      email: r.User.email
    }));

    const avg =
      ratings.length > 0
        ? (ratings.reduce((a, b) => a + b.rating, 0) / ratings.length).toFixed(1)
        : 0;

    res.json({ averageRating: avg, ratings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
