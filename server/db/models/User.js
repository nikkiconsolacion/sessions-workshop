const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4 } = Sequelize;
const db = require('../db.js');

// TODO: Fill out this model.
const User = db.define('user', {
  uselessColumn: {
    type: STRING
  },
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  username: {
    type: STRING,
    allowNull: false
  },
  password: {
    type: STRING,
    allowNull: false
  }
});

module.exports = User;
