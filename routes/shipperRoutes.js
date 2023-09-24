const express = require('express');
const Order = require('../models/order');
const router = express.Router();

router.get('/shipper', async (req, res) => {
    try {
        const activeOrders = await Order.find({ status: 'Active' });
        const inactiveOrders = await Order.find({ status: 'Inactive' });
        
        res.render('shipper', { activeOrders, inactiveOrders });
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong!');
    }
});

module.exports = router;
