const { category, product } = require('../../models');

module.exports = (request, reply) => {
  const includes = requestHelpers.parseIncludes({ category }, request.query.include);
  const output = product.findOne({
    include: includes,
    where: { id: request.params.productId }
  });

  reply(output);
}
