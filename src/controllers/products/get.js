const { category, image, product } = require('../../models')
const { requestHelpers } = require('../../utils')
const Boom = require('boom')

module.exports = (request, reply) => {
  const includes = requestHelpers.parseIncludes({ category, image }, request.query.include)
  const order = requestHelpers.parseOrder(request.query.orderBy, request.query.orderDirection)
  request.server.auth.test('jwt', request, (err, credentials) => {
    const paranoid = (err || request.query.includeDeleted !== 'true')

    let whereClauses = {}
    if (err || request.query.includeDrafts !== 'true') {
      whereClauses.publishedAt = {
        $lte: new Date()
      }
    } else if (request.query.includeDrafts) {
      whereClauses.publishedAt = {
        $or: [
          { $lte: new Date() },
          null
        ]
      }
    }

    const queryParams = {
      where: whereClauses,
      include: includes,
      limit: request.query.limit || 25,
      offset: request.query.offset || 0,
      order: order,
      paranoid: paranoid
    }

    product.findAndCountAll(queryParams)
      .then(productList => reply({
        data: productList.rows,
        meta: {
          count: productList.count,
          limit: queryParams.limit,
          offset: queryParams.offset,
          order: queryParams.order
        }
      }))
      .catch(err => {
        reply(Boom.badImplementation('Could not retrieve products', err))
      })
  })
}
