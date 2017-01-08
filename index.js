'use strict';

const config = require('dotenv').config({path: __dirname + '/.env'});
const Hapi = require('hapi');
const routes = require('./src/routes');
const { auth } = require('./src/utils');

const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 8001,
  routes: {
    cors: true
  }
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

server.register([{
  register: require('good'),
  options: goodOptions
},
require('hapi-auth-jwt2'),
require('inert')
], err => {

  server.auth.strategy('jwt', 'jwt', auth.config);
  server.auth.default('jwt');

  for (const route in routes) {
    server.route(routes[route]);
  }

  server.start(() => console.log(`started at: ${server.info.uri}`))

})
