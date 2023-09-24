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
    image: {
        data: Buffer,
        contentType: String
    },
    category: {
        type: String,
        required: true,
    },
    stockQuantity: Number,
});
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
module.exports = Product;
