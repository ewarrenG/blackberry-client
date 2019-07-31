'use strict';
const express = require('express');
const router = express.Router();

const indexCtrl = require('../controllers/indexController');

router.get('/companies/:company_name?', indexCtrl.getCompanies);

module.exports = router;
