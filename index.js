'use strict';

const config = require('dotenv').config();
const Hapi = require('hapi');
const routes = require('./src/routes');
const authConfig = require('./src/utils/auth.js');

const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 8001
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
require('hapi-auth-jwt2')
], err => {

  server.auth.strategy('jwt', 'jwt', authConfig);
  server.auth.default('jwt');

  for (const route in routes) {
    server.route(routes[route]);
  }

  server.start(() => console.log(`started at: ${server.info.uri}`))

})
