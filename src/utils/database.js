const Sequelize = require('sequelize');

module.exports = {
  conn: new Sequelize('eras_api', 'eras_api', 'hastings1066', {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 33060
  })
}
