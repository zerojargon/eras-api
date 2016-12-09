const { category } = require('../../models');
const { requestHelpers } = require('../../utils');

module.exports = (request, reply) => {
  const includes = requestHelpers.parseIncludes({}, request.query.include);
  category.findAll({ include: includes})
    .then(categoryList => {
      reply(categoryList);
    })
    .catch(err => {
      reply(Boom.badImplementation('Could not retrieve categories'));
    });
}
