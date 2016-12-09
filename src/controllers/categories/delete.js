const { category } = require('../../models');
const Boom = require('boom');

module.exports = (request, reply) => {
  category.findOne({
    where: {
      id: request.params.categoryId
    }
  })
    .then(categoryToDestroy => {
      categoryToDestroy.destroy()
        .then(destroyedProduct => {
          reply(destroyedProduct);
        })
        .catch(err => {
          reply(Boom.badImplementation('The category could not be destroyed'));
        });
    })
    .catch(err => {
      reply(Boom.notFound());
    });
}
