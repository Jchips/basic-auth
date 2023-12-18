'use strict';

// 3rd Party Resources
require('dotenv').config();
const express = require('express');
// const bcrypt = require('bcrypt');
// const base64 = require('base-64');
// const { Sequelize, DataTypes } = require('sequelize');

// const signin = require('./src/auth/signin');
// const user = require('./src/auth/models/userModel');
const router = require('./src/auth/router');

// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// const sequelize = new Sequelize(process.env.DATABASE_URL);

// const userModel = user(sequelize, DataTypes);

// Process FORM intput and put the data on req.body. Allows us to accept webform data
app.use(express.urlencoded({ extended: true }));

app.use(router);

// Create a Sequelize model
// const Users = sequelize.define('User', {
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
// app.post('/signup', async (req, res) => {

//   try {
//     req.body.password = await bcrypt.hash(req.body.password, 10);
//     const record = await Users.create(req.body);
//     res.status(200).json(record);
//   } catch (e) { res.status(403).send('Error Creating User'); }
// });


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
// app.post('/signin', signin);

// make sure our tables are created, start up the HTTP server.
// sequelize.sync()
//   .then(() => {
//     app.listen(3000, () => console.log('server up'));
//   }).catch(e => {
//     console.error('Could not start server', e.message);
//   });

function start() {
  app.listen(3000, () => console.log('server up'));
}

module.exports = { start, app };