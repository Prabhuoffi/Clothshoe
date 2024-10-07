const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body); // Use req.body directly

    await newOrder.save();
    res.status(201).send("Order saved to the database!");
  } catch (error) {
    res.status(500).send("Error saving order to the database: " + error.message);
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orderList = await Order.find();
    res.status(200).json(orderList);
  } catch (error) {
    res.status(500).send("Error retrieving orders: " + error.message);
  }
};

