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
  const queryParams = {
    include: includes,
    limit: request.query.limit || 25,
    offset: request.query.offset || 0,
    order: order
  }

  category.findAndCountAll(queryParams)
    .then(categoryList => reply({
      data: categoryList.rows,
      meta: {
        count: categoryList.count,
        limit: queryParams.limit,
        offset: queryParams.offset,
        order: queryParams.order
      }
    }))
    .catch(err => {
      reply(Boom.badImplementation('Could not retrieve categories', err))
    })
}
