const {
  categoryGet,
  categoryShow,
  categoryCreate,
  categoryUpdate,
  categoryDelete
} = require('../controllers/categories');

const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/categories',
    config: {
      auth: false,
      handler: categoryGet
    }
  },
  {
    method: 'GET',
    path: '/categories/{categoryId}',
    config: {
      auth: false,
      handler: categoryShow
    }
  },
  {
    method: 'POST',
    path: '/categories',
    config: {
      handler: categoryCreate,
      validate: {
        payload: {
          name: Joi.string().min(3).max(255).required()
        }
      }
    }
  },
  {
    method: 'PATCH',
    path: '/categories/{categoryId}',
    config: {
      handler: categoryUpdate,
      validate: {
        payload: {
          name: Joi.string().min(3).max(255).required()
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/categories/{categoryId}',
    config: {
      auth: false,
      handler: categoryDelete
    }
  }
];
