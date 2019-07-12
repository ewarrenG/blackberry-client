'use strict';
const express = require('express');
const router = express.Router();

const indexCtrl = require('../controllers/indexController');

//mobile app
router.get('/', indexCtrl.getResults); //needs better name


module.exports = router;