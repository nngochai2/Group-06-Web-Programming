const Product = require('../models/product');
const Order = require('../models/order');

exports.viewProducts = async (req, res) => {
  try {
    const vendorId = req.user._id; 
    const products = await Product.find({ vendorId });
    res.render('vendor', { products }); // Changed the view name to 'vendor' to match the EJS file name
  } catch (error) {
    console.error('Error viewing products:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, stock, productImage } = req.body;
    
    if (name.length < 10 || name.length > 20) {
        return res.status(400).send('Product name must be between 10 and 20 characters');
    }
    if (description.length > 500) {
        return res.status(400).send('Description must be at most 500 characters');
    }
    const newProduct = new Product({
        name,
        price,
        description,
        stock, // Added stock
        image: productImage, // Added image URL or path
        vendorId: req.user._id, 
    });
    
    await newProduct.save();
    res.status(201).redirect('/vendor/view-products');
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Internal Server Error');
  }
};
