'use strict';

const express = require('express');
// const bcrypt = require('bcrypt');
const signin = require('./signin');
const { Users } = require('./models/userModel');

const router = express.Router();

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
router.post('/signup', async (req, res) => {

  try {
    // req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await Users.create(req.body);
    res.status(200).json(record);
  } catch (e) { 
    console.error(e);
    res.status(403).send('Error Creating User');
  }
});


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post('/signin', signin, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;