const Sequelize = require('sequelize');
const { database } = require('../utils');

module.exports = database.conn.define('images', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
}, {
  freezeTableName: true
})
