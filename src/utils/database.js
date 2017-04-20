const { DB_DATABASE, DB_USERNAME, DB_PASS, DB_HOST, DB_PORT } = require('./config')
const Sequelize = require('sequelize')

module.exports = {
  conn: new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    port: DB_PORT
  })
}
