'use strict';
const express = require('express');
const router = express.Router();

const indexCtrl = require('../controllers/indexController');

router.get('/companies', indexCtrl.getCompanies);

module.exports = router;
