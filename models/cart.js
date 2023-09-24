const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product', 
            required: true
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        price: Number
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
