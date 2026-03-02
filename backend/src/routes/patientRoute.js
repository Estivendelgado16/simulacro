const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

router.post('/patients', patientController.createPatient)

module.exports = router;