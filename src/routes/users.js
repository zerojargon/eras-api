const { userCreate } = require('../controllers/users')
const Joi = require('joi')

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
      handler: userCreate
    }
  }
]
