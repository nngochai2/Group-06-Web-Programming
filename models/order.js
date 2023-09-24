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
    products: [{
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
        enum: ['Pending', 'Active', 'Inactive', 'Delivered', 'Completed'],
        default: 'Pending'
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveryDate: Date,
    totalAmount: Number,
    deliveryAddress: String,
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
