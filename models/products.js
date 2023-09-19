const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    description: String
});

// model name: 'Product' will be used to turn into a collection name in DB
// 'Product' => 'product' + 's' => products
module.exports = mongoose.model('Product', productSchema);