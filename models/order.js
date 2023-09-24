const mongoose = require('mongoose');

const distributionhubs = ["Alpha","Beta","Gamma"];

const OrderSchema = new mongoose.Schema({
    distributionHub: {
        type: mongoose.Schema.Types.ObjectId,
        enum: distributionhubs,
        default: (){
            //randomly select a distribution hub
            return distributionhubs[Math.floor(Math.random() * distributionhubs.length)];
        }
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
    }],
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
