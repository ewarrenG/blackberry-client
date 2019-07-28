'use strict';
const express = require('express');
const router = express.Router();

const indexCtrl = require('../controllers/indexController');

router.get('/results', indexCtrl.getResults); //needs better name
router.get('/copy', indexCtrl.copyCollection); //needs better name

module.exports = router;
