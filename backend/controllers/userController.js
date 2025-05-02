const { Op } = require("sequelize");
const Store = require("../models/Store");
const Rating = require("../models/Rating");
const { User } = require("../models");


exports.getStores = async (req, res) => {
  try {
    // Fetch all stores with average rating
    const stores = await Store.findAll({
      include: [{ model: Rating, attributes: ["rating", "userId"] }]
    });

    const result = stores.map(store => {
      const allRatings = store.Ratings.map(r => r.rating);
      const avgRating =
        allRatings.length > 0
          ? (allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1)
          : 0;

      // find this user's rating if any
      const userRatingRecord = store.Ratings.find(r => r.userId === req.user.id);
      return {
        id: store.id,
        name: store.name,
        address: store.address,
        rating: avgRating,
        userRating: userRatingRecord ? userRatingRecord.rating : null
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.rateStore = async (req, res) => {
  const { storeId } = req.params;
  const { rating } = req.body;
  try {
    // Upsert user's rating
    const [rec, created] = await Rating.upsert({
      userId: req.user.id,
      storeId: parseInt(storeId),
      rating: parseInt(rating)
    }, { returning: true });
    res.json({ message: created ? "Rating created" : "Rating updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
