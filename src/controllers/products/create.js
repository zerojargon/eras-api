const { category, product } = require('../../models');

module.exports = (request, reply) => {
  product.create(request.payload).then(createdProduct => {
    reply(createdProduct)
  });
}
