const { imageCreate, imageShow } = require('../controllers/images')
const Joi = require('joi')

module.exports = [
  {
    method: 'GET',
    path: '/images/{imageId}/{fileName?}',
    config: {
      auth: false,
      validate: {
        query: Joi.object().keys({
          height: Joi.number().integer().max(2000),
          width: Joi.number().integer().max(2000)
        })
      }
    },
    handler: imageShow
  },
  {
    method: 'POST',
    path: '/images',
    config: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
        maxBytes: 50000000
      },
      validate: {
        payload: Joi.object().keys({
          image: Joi.object({
            pipe: Joi.func().required()
          }).unknown().required(),
          productIds: Joi.array().single().items(Joi.number().integer())
        })
      },
      handler: imageCreate
    }
  }
]
