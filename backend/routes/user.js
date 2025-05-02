const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getStores, rateStore } = require("../controllers/userController");

// GET all stores with ratings
router.get("/stores", authMiddleware, getStores);

// POST or update rating for a store
router.post("/rate/:storeId", authMiddleware, rateStore);

module.exports = router;
