const { product } = require('../../models')
const productGet = require('./get')
const Boom = require('boom')

module.exports = (request, reply) => {
  product.findOne({
    where: {
      id: request.params.productId
    }
  })
    .then(productToDestroy => {
      productToDestroy.destroy()
        .then(destroyedProduct => {
          productGet(request, reply)
        })
        .catch(err => {
          reply(Boom.badImplementation('The product could not be deleted', err))
        })
    })
    .catch(err => {
      reply(Boom.notFound('Product not found', err))
    })
}
