'use strict';

const Hapi = require('hapi');
const db = require('./db/Interface');

// Create a server with a host and port
const server = new Hapi.Server();
const dbInterface = new db.Interface();

server.connection({
    host: 'localhost',
    port: 8000
});

// Add the route
server.route({
    method: 'GET',
    path:'/user/{email}',
    handler: function (request, reply) {
      let userResult = dbInterface.get(request.params.email);
      return reply(userResult);
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
