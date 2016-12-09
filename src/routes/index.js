const categoryRoutes = require('./categories');
const productRoutes = require('./products');
const userRoutes = require('./users')
const Boom = require('boom');
const crypto = require('crypto');
const Joi = require('joi');
const { user } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('dotenv').config();

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

const baseRoutes = [
  {
    method: '*',
    path: '/{uri*}',
    config: {
      auth: false
    },
    handler: (request, reply) => {
      reply(Boom.notFound())
    }
  },
  {
    method: 'GET',
    path: '/',
    config: {
      auth: false,
      handler: (request, reply) => {
        reply('This is the index. Go away')
      }
    }
  },
  {
    method: 'POST',
    path: '/token',
    config: {
      auth: false,
      validate: {
        payload: Joi.object().keys({
          email: Joi.string().email().max(255).required(),
          password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(255).required()
        })
      },
      handler: (request, reply) => {
        user.findOne({
          where: {
            email: request.payload.email
          }
        }).then(currentUser => {
          const saltedPassword = sha512(request.payload.password, currentUser.salt).passwordHash;
          if (saltedPassword === currentUser.password) {
            reply({
              token: jwt.sign({
                data: currentUser.id
              }, config.AUTH_KEY, { expiresIn: '20h' }),
              user: {
                id: currentUser.id,
                email: currentUser.email
              }
            });
          } else {
            reply(Boom.unauthorized('invalid credentials'));
          }
        }).catch(error => {
          reply(error);
        })
      }
    }
  }
];

module.exports = [
  ...baseRoutes,
  ...categoryRoutes,
  ...productRoutes,
  ...userRoutes
];
