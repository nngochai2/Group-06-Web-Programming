const express = require('express');
const Product = require('../models/Product');
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
  


module.exports = router;