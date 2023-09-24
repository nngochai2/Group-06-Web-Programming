const Product = require('../models/product');

exports.renderVendorPage = async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('vendor', { products });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Error fetching products' });
    }
};

exports.addNewProduct = async (req, res) => {
    try {
        const { name, price, stockQuantity, description } = req.body;
        const productImage = req.file;

        // Validate input fields here if needed

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
        res.status(500).render('error', { message: 'Error adding new product' });
    }
};

exports.getEditProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).render('error', { message: 'Product not found' });
        }

        res.render('edit-product', { product });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Error fetching product' });
    }
};

exports.postEditProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const updatedProductImage = req.file;
        const updatedProduct = {
            name: req.body.name,
            price: req.body.price,
            stockQuantity: req.body.stockQuantity,
            description: req.body.description,
        };

        if (updatedProductImage) {
            updatedProduct.imageUrl = updatedProductImage.path;
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).render('error', { message: 'Product not found' });
        }

        await Product.findByIdAndUpdate(productId, updatedProduct);
        res.redirect('/vendor');
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Error updating product' });
    }
};

exports.deleteProduct = async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).render('error', { message: 'Product not found' });
        }

        await Product.findByIdAndDelete(productId);
        res.redirect('/vendor');
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Error deleting product' });
    }
};
