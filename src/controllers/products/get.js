const { category, product } = require('../../models');
const { requestHelpers } = require('../../utils');

module.exports = (request, reply) => {
  const includes = requestHelpers.parseIncludes({ category }, request.query.include)
  const output = product.findAll({ include: includes});

  reply(output);
}
