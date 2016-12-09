const { product } = require('../../models');
const Boom = require('boom');

module.exports = (request, reply) => {
  product.create(request.payload)
    .then(createdProduct => {
      if (request.payload.categoryIds) {
        createdProduct.addCategories(request.payload.categoryIds)
          .then(linkedProduct => {
            reply(createdProduct);
          })
          .catch(err => {
            reply(Boom.badImplementation('Could not add categories to product ' + createdProduct.id));
          });
      } else {
        reply(createdProduct);
      }
    })
    .catch(err => {
      reply(Boom.badImplementation('Could not create product'));
    });
}
