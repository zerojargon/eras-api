const { user } = require('../../models');
const crypto = require('crypto');
const Joi = require('joi');

const generateSalt = (length = 16) => {
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0,length);   /** return required number of characters */
};

const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  const value = hash.digest('hex');
  return {
      salt: salt,
      passwordHash: value
  };
};

const saltHashPassword = (password) => {
  const salt = generateSalt(16); /** Gives us salt of length 16 */
  return sha512(password, salt);
}

module.exports = (request, reply) => {

  hashedAuth = saltHashPassword(request.payload.password);

  user.create({
    email: request.payload.email,
    password: hashedAuth.passwordHash,
    salt: hashedAuth.salt
  }).then(newUser => {
    reply(newUser)
  });

}
