const { productGet } = require('../controllers/products')

module.exports = [
  {
    method: 'GET',
    path: '/products',
    config: {
      auth: false,
      handler: productGet
    }
  }
];
