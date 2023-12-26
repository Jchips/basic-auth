'use strict';

const base64 = require('base-64');
const middleware = require('../src/auth/signin');
const { sequelize, Users } = require('../src/auth/models/userModel');

let userInfo = {
  admin: { username: 'admin-basic', password: 'password' },
};

// Pre-load our database with fake users
beforeAll(async () => {
  await sequelize.sync();
  await Users.create(userInfo.admin);
});
afterAll(async () => {
  await sequelize.drop();
});

describe('Auth Middleware', () => {

  // admin:password: YWRtaW46cGFzc3dvcmQ=
  // admin:foo: YWRtaW46Zm9v

  // Mock the express req/res/next that we need for each middleware call
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  describe('user authentication', () => {

    it('logs in an admin user with the right credentials', () => {
      let basicAuthString = base64.encode(`${userInfo.admin.username}:${userInfo.admin.password}`);

      // Change the request to match this test case
      req.headers = {
        authorization: `Basic ${basicAuthString}`,
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith();
        });

    });
  });
});
