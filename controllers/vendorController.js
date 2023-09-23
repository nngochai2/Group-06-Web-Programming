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

exports.addNewProduct = async (req, res) => {
    try {
        const { name, price, stockQuantity, description } = req.body;
        const productImage = req.file; 
        
        const newProduct = new Product({
            name,
            price,
            stockQuantity,
            description,
            imageUrl: productImage ? productImage.path : null,
        });
        
        await newProduct.save();
        
        res.redirect('/vendor');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding new product');
    }
};