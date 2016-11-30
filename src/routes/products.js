const {
  productGet,
  productShow,
  productCreate,
  productUpdate,
  productDelete
} = require('../controllers/products');

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
      handler: productCreate
    }
  },
  {
    method: 'PATCH',
    path: '/products/{productId}',
    config: {
      handler: productUpdate
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
