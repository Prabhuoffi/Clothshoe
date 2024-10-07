
const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

// Create new order
router.post("/create", orderController.createOrder);

// Get all orders
router.get("/", orderController.getAllOrders);

module.exports = router;
