const Sequelize = require('sequelize');
const { database } = require('../utils');

module.exports = database.conn.define('imageProducts', {
  imageId: {
    type: Sequelize.INTEGER
  },
  productId: {
    type: Sequelize.INTEGER
  }
}, {
  freezeTableName: true,
  timestamps: false
})
