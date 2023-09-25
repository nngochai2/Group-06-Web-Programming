/* RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023B
  Assessment: Assignment 2
  Author: Group 6
  ID: Pham Thanh Mai (s3978365)
       Nguyen Ngoc Hai (s3978281)
       Phan Nguyen Viet Nhan (s3978145)
       Tran Nhat Minh (s3977767)
       Nguyen Duy Anh (s4022628
  Acknowledgement: Bootstrap, FontAwesome , Ion-icon, W3School, Freepik */
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

module.exports = router;