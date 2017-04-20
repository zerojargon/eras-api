const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const Boom = require('boom')

const { image } = require('../../models')
const appDir = path.dirname(require.main.filename)

module.exports = (request, reply) => {
  image.findOne({
    where: { id: request.params.imageId }
  }).then(foundImage => {
    const imageParams = {
      height: request.query.height || 250,
      width: request.query.width || 250
    }
    const fileName = `${foundImage.id}--h-${imageParams.height}--w-${imageParams.width}.jpg`
    const filePath = `${appDir}/storage/${fileName}`
    // check to see if we have a cached version of the image
    if (fs.existsSync(filePath)) {
      reply.file(filePath)
    } else {
      const originalFilePath = `${appDir}/storage/${foundImage.id}-original`
      if (fs.existsSync(originalFilePath)) {
        sharp(originalFilePath)
          .resize(imageParams.width, imageParams.height)
          .toFile(filePath, function (err) {
            if (err) {
              reply(Boom.badImplementation('We could not write the image file', err))
            }
            reply.file(filePath)
          })
      } else {
        reply(Boom.badImplementation('We could not find the image file, sorry'))
      }
    }
  }).catch(err => {
    reply(Boom.notFound('We could not find the image', err))
  })
}
