const { category } = require('../../models')
const Boom = require('boom')

module.exports = (request, reply) => {
  category.create(request.payload)
    .then(createdProduct => {
      reply(createdProduct)
    })
    .catch(err => {
      reply(Boom.badImplementation('Could not create category', err))
    })
}
