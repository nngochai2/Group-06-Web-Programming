const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

router.get('/', vendorController.viewProducts);
router.post('/add-product', vendorController.addProduct);

module.exports = router;
