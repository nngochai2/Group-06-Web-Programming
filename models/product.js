const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    imageUrl: String,
    category: String,
    stockQuantity: Number,
});
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
module.exports = Product;
