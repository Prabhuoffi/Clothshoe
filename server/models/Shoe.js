const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  offer: {
    type: String,
    required: true,
  },
  freeDelivery: {
    type: Boolean,
    required: true,
  },
  bankOffer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Shoe', shoeSchema);
