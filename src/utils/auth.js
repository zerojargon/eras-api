const { AUTH_KEY } = require('dotenv').config();
const Sequelize = require('sequelize');

const validate = (decoded, request, callback) => {
  const { user } = require('../models');
  user.findOne({
    where: {
      id: decoded.id
    }
  }).then(currentUser => {
    return callback(null, true);
  }).catch(() => {
    return callback(null, false);
  })
};

module.exports = {
  key: AUTH_KEY,
  validateFunc: validate,
  verifyOptions: { algorithms: [ 'HS256' ] }
}
