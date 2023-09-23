const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shipperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  status: {
    type: String,
    enum: ['Pending', 'Ready for Shipment', 'In Transit', 'Delivered'],
    default: 'Pending'
  },
  // Additional order fields as needed
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
