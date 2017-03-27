'use strict';

const Hapi = require('hapi');
const db = require('./db/Interface');
const Good = require('good');
const Joi = require('joi');

const { createErr } = require('./utils');

// Create a server with a host and port
const server = new Hapi.Server();
const dbInterface = new db.Interface();

server.connection({
    host: 'localhost',
    port: 8000
});

server.route({
  method: 'GET',
  path:'/api/user/',
  handler: (request, reply) => {
    let userResult = dbInterface.get(request.query.email);
    console.log(`GET user result ${userResult}`);
    if (userResult) {
      return reply(userResult);
    } else {
      return reply(createErr("User not found")).code(404);
    }
  },
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
  handler: (request, reply) => {
    console.log('POST Request payload:', request.payload);
    let userResult = dbInterface.insert(request.payload);
    if (userResult) {
      return reply(userResult).code(201);
    } else {
      return reply(createErr("Bad request, User not created")).code(400);
    }
  },
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
