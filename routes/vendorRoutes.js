const express = require('express');
const vendorController = require('../controllers/vendorController');

const router = express.Router();

router.get('/view-products', vendorController.viewProducts);
router.get('/add-product', (req, res) => {
    res.render('add-product');
});
router.post('/add-product', vendorController.addProduct);

module.exports = router;
