const Sequelize = require('sequelize');
const { database } = require('../utils');

module.exports = database.conn.define('products', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    field: 'name'
  }
}, {
  freezeTableName: true,
  timestamps: false
})
