const express = require("express");
const cors = require("cors");
require('dotenv').config();

const doctorController = require('./routes/doctorRoute')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', doctorController)



module.exports = app;