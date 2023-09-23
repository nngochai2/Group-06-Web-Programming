const express = require('express');
const vendorController = require('../controllers/vendorController'); 
const router = express.Router();

router.get('/vendor', vendorController.renderVendorPage);

module.exports = router;
