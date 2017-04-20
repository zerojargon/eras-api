const path = require('path')
const appDir = path.dirname(require.main.filename)

module.exports = require('dotenv').config({
  path: appDir + '/.env'
}).parsed
