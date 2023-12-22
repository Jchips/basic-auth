'use strict';

const { start } = require('./src/server');

const { sequelize } = require('./src/auth/models/userModel');

// make sure our table is created, start up the HTTP server.
sequelize.sync()
  .then(() => {
    start();
  }).catch(e => {
    console.error('Could not start server', e.message);
  });