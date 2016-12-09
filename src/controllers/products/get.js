const { category, product } = require('../../models');
const { requestHelpers } = require('../../utils');

module.exports = (request, reply) => {
  const includes = requestHelpers.parseIncludes({ category }, request.query.include);
  product.findAll({ include: includes})
    .then(productList => {
      reply(productList);
    })
    .catch(err => {
      reply(Boom.badImplementation('Could not retrieve products'));
    });
}
