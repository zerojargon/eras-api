const { image } = require('../../models')
const Boom = require('boom')

module.exports = (request, reply) => {
  image.findOne({
    where: {
      id: request.params.imageId
    }
  })
    .then(imageToDestroy => {
      imageToDestroy.destroy()
        .then(destroyedImage => {
          reply('Image deleted successfully')
        })
        .catch(err => {
          reply(Boom.badImplementation('The image could not be deleted', err))
        })
    })
    .catch(err => {
      reply(Boom.notFound('Image not found', err))
    })
}
