'use strict';

const { app } = require('../src/server');
const supertest = require('supertest');
const { sequelize } = require('../src/auth/models/userModel');
const request = supertest(app);

// Turn database on for test
beforeAll(async () => {
  // await sequelize.drop();
  await sequelize.sync();
  await console.log('server synced');
  // console.log('sequelize in server.test', sequelize); // delete later
});

// Turn database off for test
afterAll(async () => {
  await sequelize.drop();
  await console.log('server dropped');
});

describe('Basic Auth', () => {
  it('create new user', async () => {
    let response = await request.post('/signup').send({
      username: 'dog',
      password: 'password123',
    });

    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('dog');
    expect(response.body.password).toBeTruthy();
  });

  it('login', async () => {
    let response = await request.post('/signin').auth('dog', 'password123');

    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('dog');
    expect(response.body.password).toBeTruthy();
  });

  it('handles missing or invalid requests', async () => {
    const response = await request.post('/foo');

    expect(response.status).toEqual(404);
  });
});