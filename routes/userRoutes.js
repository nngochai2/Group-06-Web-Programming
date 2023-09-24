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
            // Add other fields as needed
        });

        await user.save();
        res.redirect('/login');
        console.log(`User registered: ${username}`);

        // Send a success response
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
