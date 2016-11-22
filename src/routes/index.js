const productRoutes = require('./products');

const baseRoutes = [
  {
    method: '*',
    path: '/{uri*}',
    handler: (request, reply) => {
      reply(Boom.notFound())
    }
  },
  {
    method: 'GET',
    path: '/',
    config: {
      handler: (request, reply) => {
        reply('This is the index. Go away')
      }
    }
  }
];

module.exports = [
  ...baseRoutes,
  ...productRoutes
];
