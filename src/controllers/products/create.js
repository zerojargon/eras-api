const { category, product } = require('../../models');

module.exports = (request, reply) => {
  product.create(request.payload).then(createdProduct => {
    if (request.payload.categoryIds) {
      createdProduct.addCategories(request.payload.categoryIds).then(linkedProduct => {
        reply(createdProduct);
      })
    } else {
      reply(createdProduct);
    }
  });
}
