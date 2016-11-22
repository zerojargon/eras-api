const { productGet } = require('../controllers/products')

const productRoutes = [
  {
    method: 'GET',
    path: '/products',
    config: {
      handler: productGet
    }
  }
];

module.exports = productRoutes;
