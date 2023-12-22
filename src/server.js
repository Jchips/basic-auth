'use strict';

// 3rd Party Resources
require('dotenv').config();
const express = require('express');

const router = require('./auth/router');

// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body. Allows us to accept webform data
app.use(express.urlencoded({ extended: true }));

app.use(router);

function start() {
  app.listen(3000, () => console.log('server up'));
}

module.exports = { start, app };