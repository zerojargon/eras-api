const Sequelize = require('sequelize')
const { database } = require('../utils')

module.exports = database.conn.define('products', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  stockCode: Sequelize.INTEGER,
  price: Sequelize.INTEGER,
  discountedPrice: Sequelize.INTEGER,
  description: Sequelize.TEXT,
  primaryImageId: Sequelize.INTEGER,
  width: Sequelize.INTEGER,
  height: Sequelize.INTEGER,
  depth: Sequelize.INTEGER,
  publishedAt: Sequelize.DATE
}, {
  freezeTableName: true,
  paranoid: true,
  timestamps: true
})
