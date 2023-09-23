const Product = require('../models/product'); 

exports.renderVendorPage = async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('vendor', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching products');
    }
};
