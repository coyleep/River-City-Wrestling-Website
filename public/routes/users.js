require('dotenv').config();
const express = require('express');
const router = express.Router();
const P_KEY = process.env.STRIPE_PUBLIC;
const stripe = require("stripe");


// REGISTER PAGE
router.get('/register', (req, res) => {
    res.render('register');
});

// Payment Page
router.get('/payment', (req, res) => {
    res.render('payment',{
        stripePublicKey:P_KEY
    });
});


module.exports = router;