const { product } = require('../../models')
const Boom = require('boom')

module.exports = (request, reply) => {
  product.findOne({
    where: {
      id: request.params.productId
    }
  })
    .then(productToUpdate => {
      productToUpdate.stockCode = request.payload.stockCode || productToUpdate.stockCode
      productToUpdate.name = request.payload.name || productToUpdate.name
      productToUpdate.price = request.payload.price || productToUpdate.price
      productToUpdate.discountedPrice = request.payload.discountedPrice || productToUpdate.discountedPrice
      productToUpdate.description = request.payload.description || productToUpdate.description
      productToUpdate.primaryImageId = request.payload.primaryImageId || productToUpdate.primaryImageId
      productToUpdate.width = request.payload.width || productToUpdate.width
      productToUpdate.height = request.payload.height || productToUpdate.height
      productToUpdate.depth = request.payload.depth || productToUpdate.depth
      productToUpdate.publishedAt = request.payload.publishedAt || productToUpdate.publishedAt

      productToUpdate.save()
        .then(savedProduct => {
          if (request.payload.categoryIds) {
            savedProduct.setCategory(request.payload.categoryIds)
              .then(linkedProduct => {
                reply(savedProduct)
              })
              .catch(err => {
                reply(Boom.badImplementation('Could not retrieve products', err))
              })
          } else {
            reply(savedProduct)
          }
        })
        .catch(err => {
          reply(Boom.badImplementation('Could not update product', err))
        })
    })
    .catch(err => {
      reply(Boom.notFound('Product not found', err))
    })
}
