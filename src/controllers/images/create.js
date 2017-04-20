const { image } = require('../../models')
const fs = require('fs')
const path = require('path')
const Boom = require('boom')
const appDir = path.dirname(require.main.filename)

module.exports = (request, reply) => {
  const data = request.payload
  if (data.image) {
    image.create().then(createdImage => {
      const name = `${createdImage.id}-original`
      const path = appDir + '/storage/' + name
      const file = fs.createWriteStream(path)

      file.on('error', function (err) {
        console.error(err)
      })

      data.image.pipe(file)

      data.image.on('end', function (err) {
        if (err) {
          reply(Boom.badImplementation('Could not create image ', err))
        }
        if (request.payload.productIds) {
          createdImage.addProducts(request.payload.productIds)
            .then(linkedProduct => {
              reply(createdImage)
            })
            .catch(createErr => {
              reply(Boom.badImplementation('Could not add products to image ' + createdImage.id, createErr))
            })
        } else {
          reply(createdImage)
        }
      })
    }).catch(err => reply(Boom.badImplementation('Could not create image ', err)))
  } else {
    reply(Boom.badRequest('Image not included or parsed correctly'))
  }
}
