const Sequelize = require('sequelize');
const crypto = require('crypto');

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

const generateSalt = (length = 16) => {
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0,length);   /** return required number of characters */
};

const sha512 = (string, salt) => {
  const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(string);
  const value = hash.digest('hex');
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
  return (sha512(string, salt).stringHash === encrytedString);
}

module.exports = {
  buildConfig: function(authKey) {
    return {
      key: authKey,
      validateFunc: validate,
      verifyOptions: { algorithms: [ 'HS256' ] }
    }
  },
  encrypt: saltHashString,
  validateString: validateString
}
