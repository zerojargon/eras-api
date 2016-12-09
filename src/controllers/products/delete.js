const { product } = require('../../models');
const Boom = require('boom');

module.exports = (request, reply) => {
  product.findOne({
    where: {
      id: request.params.productId
    }
  })
    .then(productToDestroy => {
      productToDestroy.destroy()
        .then(destroyedProduct => {
          reply(destroyedProduct);
        })
        .catch(err => {
          reply(Boom.badImplementation('The product could not be destroyed'));
        });
    })
    .catch(err => {
      reply(Boom.notFound());
    });
}