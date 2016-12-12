const { category, image, product } = require('../../models');
const { requestHelpers } = require('../../utils');
const Boom = require('boom');

module.exports = (request, reply) => {
  const includes = requestHelpers.parseIncludes({ category, image }, request.query.include);
  request.server.auth.test('jwt', request, (err, credentials) => {
    const paranoid = (err !== null);
    product.findOne({
      include: includes,
      where: { id: request.params.productId },
      paranoid: paranoid
    })
    .then(foundProduct => {
      if (foundProduct) {
        return reply(foundProduct);
      }
      return reply(Boom.notFound());
    })
    .catch(err => {
      return reply(Boom.notFound());
    });
  });
};
