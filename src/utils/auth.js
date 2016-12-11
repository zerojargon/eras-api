const { AUTH_KEY } = require('dotenv').config();
const Sequelize = require('sequelize');
const crypto = require('crypto');

const { user } = require('../models');

const validate = (decoded, request, callback) => {
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

const generateSalt = (length = 16) => {
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0,length);   /** return required number of characters */
};

const sha512 = (string, salt) => {
  console.log('sha', string, salt);
  const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  console.log('post hash');
  hash.update(string);
  console.log('post hash update');
  const value = hash.digest('hex');
  console.log('post hash digest');
  return {
      salt: salt,
      stringHash: value
  };
};

const saltHashString = (string) => {
  const salt = generateSalt(16); /** Gives us salt of length 16 */
  return sha512(string, salt);
}

const validateString = (string, salt, encrytedString) => {
  console.log('validate');
  return (sha512(string, salt).stringHash === encrytedString);
}

module.exports = {
  config: {
    key: AUTH_KEY,
    validateFunc: validate.bind(this),
    verifyOptions: { algorithms: [ 'HS256' ] }
  },
  encrypt: saltHashString,
  validateString: validateString
}
