const { category, product } = require('../../models');
const { requestHelpers } = require('../../utils');
const Boom = require('boom');

module.exports = (request, reply) => {
  const includes = requestHelpers.parseIncludes({ category }, request.query.include);
  product.findOne({
    include: includes,
    where: { id: request.params.productId }
  })
  .then(foundProduct => {
    reply(foundProduct);
  })
  .catch(err => {
    reply(Boom.notFound());
  });
};
