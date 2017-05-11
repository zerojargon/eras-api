const { product } = require('../../models')
const { email } = require('../../utils')
const { APP_URL } = require('../../utils/config')
const Boom = require('boom')

module.exports = (request, reply) => {
  const {
    senderAddress: email,
    message,
    productId = null
  } = request.payload

  const sendEmail = function (enquiredProduct = null) {
    const subject = (enquiredProduct) ? `Website Enquiry - ${enquiredProduct.name}` : 'Website Enquiry'
    const productInformation = (enquiredProduct) ? `
    The product is: ${enquiredProduct.name}, and can be found at ${APP_URL}/products/${enquiredProduct.id}
    ` : ''

    const body = `You have received an enquiry from ${senderAddress}
    ${productInformation}
    The enquiry is as follows:
    -----
    ${message}
    -----`

    return email.send(senderAddress, subject, body)
      .then(response => {
        reply(response)
      })
      .catch(err => {
        reply(Boom.badImplementation('enquiry creation failed', err))
      })
  }

  if (productId) {
    return product.findOne({
      where: {
        id: productId
      }
    })
    .then(foundProduct => {
      if (foundProduct) {
          return sendEmail(foundProduct)
      }
      reply(Boom.notFound('Could not find Product'))
    })
    .catch(err => {
      console.log(err)
      reply(Boom.notFound('Could not find product' , err))
    })
  }
  sendEmail()
}
