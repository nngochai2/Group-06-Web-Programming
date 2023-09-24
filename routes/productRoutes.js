const express = require('express');
const Product = require('../models/product');
const router = express.Router();
// productRoutes.js
router.get('/product-detail/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        res.render('product-detail', { product });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Error fetching product' });
    }
  });

router.get('/products/:productID', async (req, res) => {
    try {
        const productID = req.params.productID;
        const product = await Product.findById(productID);
        res.render('products', { product });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Error fetching product' });
    }
  });
module.exports = router;