const {
  enquiryCreate
} = require('../controllers/enquiries')

const Joi = require('joi')

module.exports = [
  {
    method: 'POST',
    path: '/enquiries',
    config: {
      auth: false,
      handler: enquiryCreate,
      validate: {
        payload: {
          message: Joi.string(),
          email: Joi.string().email().required(),
          productId: Joi.number().integer()
        }
      }
    }
  }
]
