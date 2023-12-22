'use strict';

const signin = require('../src/auth/signin');
const base64 = require('base-64');
const { sequelize, Users } = require('../src/auth/models/userModel');
// const Users = require('../src/auth/models/userModel');

let user = { username: 'dog', password: 'password123' };

// Turn database on for test
beforeAll(async () => {
  await sequelize.sync({force: true});
  await console.log('signin synced');
  console.log('Users:', Users); // delete later
  await Users.create(user);
});

// Turn database off for test
afterAll(async () => {
  await sequelize.drop();
  console.log('signin dropped');
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