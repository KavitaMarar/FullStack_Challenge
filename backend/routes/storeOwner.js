const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getStoreRatings } = require("../controllers/storeOwnerController");

router.get("/dashboard", authMiddleware, getStoreRatings);

module.exports = router;
