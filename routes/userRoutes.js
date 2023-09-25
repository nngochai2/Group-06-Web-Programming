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

// routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); 
const multer = require('multer');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/registerCustomer', upload.single('profilePicture'), async (req, res) => {
    try {
        if (req.body.password !== req.body.confirmpassword) {
            return res.status(400).send('Passwords do not match');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            role: 'customer',
            fullName: req.body.fullName,
            address: req.body.address,
        });

        await user.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/registerShipper', upload.single('profilePicture'), async (req, res) => {
    try {
        if (req.body.password !== req.body.confirmpassword) {
            return res.status(400).send('Passwords do not match');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            role: 'shipper',
            fullName: req.body.fullName,
            address: req.body.address,
        });

        await user.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/registerVendor', upload.single('profilePicture'), async (req, res) => {
    try {
        if (req.body.password !== req.body.confirmpassword) {
            return res.status(400).send('Passwords do not match');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            role: 'vendor',
            fullName: req.body.fullName,
            address: req.body.address,
        });

        await user.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
