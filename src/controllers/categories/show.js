const { category, image, product } = require('../../models');
const { requestHelpers } = require('../../utils');
const Boom = require('boom');

module.exports = (request, reply) => {
  const includes = requestHelpers.parseIncludes({ image, product }, request.query.include);
  category.findOne({
    include: includes,
    where: { id: request.params.categoryId }
  })
  .then(foundCategory => {
    reply(foundCategory);
  })
  .catch(err => {
    reply(Boom.notFound());
  });
};
