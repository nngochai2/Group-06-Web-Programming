const express = require('express');
const multer = require('multer');
const Product = require('../models/product'); 
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Set up storage engine with multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

router.get('/vendor', async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('vendor', { products });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Error fetching products' });
    }
});

router.get('/image/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        console.log('Product ID:', productId); 
        
        const product = await Product.findById(productId);
        if (!product) {
            console.log('Product not found'); 
            throw new Error('Product not found');
        }
        
        if (!product.image || !product.image.data) {
            console.log('Image not found for product'); 
            throw new Error('Image not found');
        }
        
        res.set('Content-Type', product.image.contentType);
        res.send(product.image.data);
    } catch (error) {
        console.error(error);
        res.status(404).send('Image not found');
    }
});


router.post('/users/vendor/newproduct', upload.single('image'), async (req, res) => {
    try {
        const { name, price, description, category, stockQuantity } = req.body;
        
        if (!category) {
            return res.status(400).send('Category is required');
        }
        const newProduct = new Product({
            name,
            price,
            description,
            category,
            stockQuantity,
            image: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: image/png
            }
        });
        await newProduct.save();
        res.status(201).send('Product added successfully');
        res.redirect('/vendor')
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


router.get('/vendor/edit/:productId', async (req, res) => {
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
});

router.post('/vendor/edit/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const updatedProduct = {
            name: req.body.name,
            price: req.body.price,
            stockQuantity: req.body.stockQuantity,
            description: req.body.description,
        };
        await Product.findByIdAndUpdate(productId, updatedProduct);
        res.redirect('/vendor');
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Error updating product' });
    }
});

router.post('/users/vendor/delete/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        await Product.findByIdAndDelete(productId);
        res.redirect('/vendor');
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Error deleting product' });
    }
});

router.get('/product-image/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product || !product.image) {
            throw new Error('Product or image not found');
        }
        res.set('Content-Type', product.image.contentType);
        res.send(product.image.data);
    } catch (error) {
        console.error(error);
        res.status(404).send('Image not found');
    }
});

module.exports = router;
