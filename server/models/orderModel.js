const mongoose = require('mongoose')
const { Schema } = mongoose;

const orderSchema = new Schema({
  name: {
    type: String,
    required: [true, "order name is required"]
  },
  email: {
    type: String,
    required: [true, "order name is required"]
  },
  userId: {
    type: String,
    ref: "user"
  },
  customerId: {
    type: String
  },
  customerDetails: {
    type: Object
  },
  orderItems: [],
  shippingAddress: {
    type: Object,
  },
  orderAmount: {
    type: String,
    // required:true
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  transactionId: {
    type: String
  }


}, { timestamps: true });

const orderModel = mongoose.model("order", orderSchema)
module.exports = orderModel