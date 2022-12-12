const mongoose = require("mongoose");

const HardwareSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  price: {
    type: String
  },
});

const ComponentsSchema = new mongoose.Schema({
  hardware: {
    type: HardwareSchema,
  },
  quantity: {
    type: Number,
  },
});

const CustomerDemandSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  dateOfRequest: {
    type: Date,
  },
  status: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
  components: {
    type: [ComponentsSchema],
  },
  softwareVersion: {
    type: String,
  },
});

const Order = mongoose.model("Order", CustomerDemandSchema);

module.exports = Order;
