'use strict';

const Hapi = require('hapi');
const db = require('./db');
const dbClient = new db.Client();
const user = {email : 'hari.b@example.com'}
// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 8000
});

// Add the route
server.route({
    method: 'GET',
    path:'/user/{email}',
    handler: function (request, reply) {
        const user = {
          email : request.params.email
        }
        let userResult = dbClient.get(user);
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
