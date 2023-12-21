'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;
// const DATABASE_URL = 'sqlite:memory';

// db instance
const sequelize = new Sequelize(DATABASE_URL);

// USER SCHEMA
const Users = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.beforeCreate(async (user) => {
  user.dataValues.password = await bcrypt.hash(user.dataValues.password, 10);
});

module.exports = { sequelize, Users };