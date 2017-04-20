const Sequelize = require('sequelize')
const { config, database } = require('../utils')

module.exports = database.conn.define('images', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  meta: {
    type: Sequelize.VIRTUAL,
    get: function () {
      const id = this.get('id')
      return {
        resourceUrl: `${config.API_URL}/images/${id}`
      }
    }
  }
}, {
  freezeTableName: true
})
