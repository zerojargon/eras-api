const { image } = require('../../models')
const Boom = require('boom')

module.exports = (request, reply) => {
  image.findOne({
    where: {
      id: request.params.imageId
    }
  })
    .then(imageToUpdate => {
      if (request.payload.productIds) {
        imageToUpdate.setProduct(request.payload.productIds)
      }

      imageToUpdate.save()
        .then(savedImage => {
          reply(savedImage)
        })
        .catch(err => {
          reply(Boom.badImplementation('Could not update image', err))
        })
    })
    .catch(err => {
      reply(Boom.notFound('image not found', err))
    })
}
