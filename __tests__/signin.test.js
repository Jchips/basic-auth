'use strict';

const signin = require('../src/auth/signin');
const base64 = require('base-64');
const { sequelize, Users } = require('../src/auth/models/userModel');
// const Users = require('../src/auth/models/userModel');

let user = { username: 'dog', password: 'password123' };

// Turn database on for test
beforeAll(async () => {
  await sequelize.sync();
  await console.log('signin synced');
  await Users.create(user);
  return Promise.resolve();
});

// Turn database off for test
afterAll(async () => {
  await sequelize.drop();
  await console.log('signin dropped');
  return Promise.resolve();
});

describe('signin middleware', () => {
  const req = {};
  const res = {};
  const next = jest.fn();

  it('user signs in as expected', () => {
    const basicAuthString = base64.encode(`${user.username}:${user.password}`);
    req.headers = {
      authorization: `Basic ${basicAuthString}`,
    };

    return signin(req, res, next)
      .then(() => {
        expect(next).toHaveBeenCalledWith();
      });
  });
});