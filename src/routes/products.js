const {
  productGet,
  productShow,
  productCreate,
  productUpdate,
  productDelete
} = require('../controllers/products');

const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/products',
    config: {
      auth: false,
      handler: productGet
    }
  },
  {
    method: 'GET',
    path: '/products/{productId}',
    config: {
      auth: false,
      handler: productShow
    }
  },
  {
    method: 'POST',
    path: '/products',
    config: {
      handler: productCreate,
      validate: {
        payload: {
          name: Joi.string()
        }
      }
    }
  },
  {
    method: 'PATCH',
    path: '/products/{productId}',
    config: {
      handler: productUpdate,
      validate: {
        payload: {
          name: Joi.string().required(),
          stockCode: Joi.string(),
          price: Joi.number().integer().min(0),
          discountedPrice: Joi.number().integer().min(0).less(Joi.ref('price')),
          description: Joi.string(),
          primaryImageId: Joi.number().integer().min(0),
          width: Joi.number().integer().min(0),
          height: Joi.number().integer().min(0),
          depth: Joi.number().integer().min(0),
          publishedAt: Joi.date().min('now')
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/products/{productId}',
    config: {
      auth: false,
      handler: productDelete
    }
  }
];
