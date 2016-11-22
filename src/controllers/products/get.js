const { product } = require('../../models');

module.exports = (request, reply) => {
  reply(product.findAll());
}
