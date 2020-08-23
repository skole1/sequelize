const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');


const errHandler = err => {
    console.log('Error: '+ err);
};

module.exports = router;