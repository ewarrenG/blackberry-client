'use strict';
const express = require('express');
const router = express.Router();

const indexCtrl = require('../controllers/indexController');

router.get('/companies/:company_name?', indexCtrl.getCompanies);
router.post('/stock/:ticker?', indexCtrl.getStockInfo);

module.exports = router;
