const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone:{type:String,require:true},
  email:{type:String,require:true},
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  zipCode: { type: String, required: true },
  totalAmount: { type: String, required: true },
  items: { type: [String], required: true },
  quantity:{type:String,required:true},
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
