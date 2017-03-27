'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Joi = require('joi');

const { createErr } = require('./utils');
const { CassandraUserClient } = require('./db/cassandraUserClient');

const { UserInterface } = require('./db/userInterface');
const { UserView } = require('./views/userView');


// Create a server with a host and port
const server = new Hapi.Server();
// Create a dbClient
const dbClient = new CassandraUserClient();
// Create an interface for a User
const userInterface = new UserInterface(dbClient);
server.connection({
    host: 'localhost',
    port: 8000
});

const userView = new UserView(userInterface);

server.route({
  method: 'GET',
  path:'/api/user/',
  handler: (request, reply) => userView.get(request, reply),
  config: {
    validate: {
      query: {
        email: Joi.string().email().required()
      }
    }
  }
});

server.route({
  method: 'POST',
  path:'/api/user/',
  handler: (request, reply) => userView.post(request, reply),
  config: {
    validate: {
      payload: {
        email: Joi.string().email().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
      }
    }
  }
});

server.route({
  method: 'DELETE',
  path:'/api/user/',
  handler: (request, reply) => userView.delete(request, reply),
  config: {
    validate: {
      payload: {
        email: Joi.string().email().required()
      }
    }
  }
});

server.register({
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}, (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start((err) => {

        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
