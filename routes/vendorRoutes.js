const express = require('express');
const multer = require('multer');
const vendorController = require('../controllers/vendorController');
const router = express.Router();


// Set up storage engine with multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/'); // specify the destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname); // specify the filename
    }
});

const upload = multer({ storage: storage });

// Define your routes
router.get('/vendor', vendorController.renderVendorPage);
router.post('/users/vendor/newproduct', upload.single('productImage'), vendorController.addNewProduct);
router.get('/vendor/edit/:productId', vendorController.getEditProduct);
router.post('/vendor/edit/:productId', vendorController.postEditProduct);
router.post('/users/vendor/delete/:productId', vendorController.deleteProduct);
router.get('/product-image/:productId', vendorController.getProductImage);


module.exports = router;
