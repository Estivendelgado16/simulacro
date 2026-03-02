const express = require('express');
const router = express.Router();
const insuranceController = require('../controllers/insuranceController');

router.post('/insurances', insuranceController.createInsurance);

module.exports = router;
