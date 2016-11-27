const Sequelize = require('sequelize');
const { database } = require('../utils');

module.exports = database.conn.define('categories', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true,
  timestamps: false
})
