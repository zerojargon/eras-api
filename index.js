'use strict';

const Hapi = require('hapi');
const routes = require('./src/routes');
const Boom = require('boom');

const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 8000
});

let goodOptions = {
  reporters: {
    console: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ log: '*', response: '*' }]
    }, {
      module: 'good-console'
    }, 'stdout']
  }
}

server.register({
  register: require('good'),
  options: goodOptions
}, err => {

  for (const route in routes) {
    server.route(routes[route]);
  }

  server.start(() => console.log(`started at: ${server.info.uri}`))

})
