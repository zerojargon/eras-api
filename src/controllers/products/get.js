const { category, product } = require('../../models');
const { requestHelpers } = require('../../utils');
const Boom = require('boom');

module.exports = (request, reply) => {
  const includes = requestHelpers.parseIncludes({ category }, request.query.include);
  const order = requestHelpers.parseOrder(request.query.orderBy, request.query.orderDirection);
  product.findAll({
    include: includes,
    limit: request.query.limit || 25,
    offset: request.query.offset || 0,
    order: order
  })
    .then(productList => {
      reply(productList);
    })
    .catch(err => {
      reply(Boom.badImplementation('Could not retrieve products'));
    });
}
