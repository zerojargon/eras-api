const { category, product, image } = require('../../models')
const { requestHelpers } = require('../../utils')
const Boom = require('boom')

module.exports = (request, reply) => {
  const includes = requestHelpers.parseIncludes({ product, image }, request.query.include)
  const order = (request.query.orderBy) ? request.query.orderBy.map((orderProp, index) => {
    let orderArray = [orderProp]
    if (request.query.orderDirection && request.query.orderDirection[index]) {
      orderArray.push(request.query.orderDirection[index])
    }
    return orderArray
  }) : [['id']]
  category.findAll({
    include: includes,
    limit: request.query.limit || 25,
    offset: request.query.offset || 0,
    order: order
  })
    .then(categoryList => {
      reply(categoryList)
    })
    .catch(err => {
      reply(Boom.badImplementation('Could not retrieve categories', err))
    })
}
