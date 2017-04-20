const Sequelize = require('sequelize')
const { database } = require('../utils')

module.exports = database.conn.define('categoryProducts', {
  categoryId: {
    type: Sequelize.INTEGER
  },
  productId: {
    type: Sequelize.INTEGER
  }
}, {
  freezeTableName: true,
  timestamps: false
})
