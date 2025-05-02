const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");
const {
  addUser,
  addStore,
  getDashboardStats,
  getUsers,
  getStores,
} = require("../controllers/adminController");

router.get("/dashboard", authMiddleware, isAdmin, getDashboardStats);
router.post("/add-user", authMiddleware, isAdmin, addUser);
router.post("/add-store", authMiddleware, isAdmin, addStore);
router.get("/users", authMiddleware, isAdmin, getUsers);
router.get("/stores", authMiddleware, isAdmin, getStores);

module.exports = router;
