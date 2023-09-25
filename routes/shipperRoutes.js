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
