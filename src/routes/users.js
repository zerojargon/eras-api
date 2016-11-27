const { userPost } = require('../controllers/users');
const { user } = require('../models');
const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/users',
    config: {
      auth: false,
      validate: {
        payload: Joi.object().keys({
          email: Joi.string().email().max(255).required(),
          password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(255).required()
        })
      },
      handler: userPost
    }
  }
];