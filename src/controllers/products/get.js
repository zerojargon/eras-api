const { category, image, product } = require('../../models')
const { requestHelpers } = require('../../utils')
const Boom = require('boom')
const Sequelize = require('sequelize')

module.exports = (request, reply) => {
  const includes = requestHelpers.parseIncludes({ category, image }, request.query.include)
  const order = requestHelpers.parseOrder(request.query.orderBy, request.query.orderDirection)
  request.server.auth.test('jwt', request, (err, credentials) => {
    const paranoid = (err || request.query.includeDeleted !== 'true')

    let whereClauses = {}
    if (request.params.categoryId) {
      const categoryInclude = includes.find(include => include.model === category)
      if (categoryInclude) {
        categoryInclude.where = {
          id: request.params.categoryId
        }
      }
    }
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

    if (request.query.query) {
      const lowerQuery = request.query.query.toLowerCase()
      whereClauses.$or = [
        {
          $and: [
            Sequelize.where(Sequelize.fn('lower', Sequelize.col('products.name')),
              {
                $like: `%${lowerQuery}%`
              }
            )
          ]
        },
        {
          $and: [
            Sequelize.where(Sequelize.fn('lower', Sequelize.col('products.description')),
              {
                $like: `%${lowerQuery}%`
              }
            )
          ]
        }
      ]
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
