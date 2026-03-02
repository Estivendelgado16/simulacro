const express = require("express");
const cors = require("cors");
require('dotenv').config();

const doctorController = require('./routes/doctorRoute');
const patientController = require('./routes/patientRoute');
const insuranceController = require('./routes/insuranceRoute');
const appointmentController  = require('./routes/appointmentRoute');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', doctorController)
app.use('/api', patientController)
app.use('/api', insuranceController)
app.use('/api', appointmentController)



module.exports = app;