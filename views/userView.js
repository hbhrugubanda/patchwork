'use strict';

const { AbstractView } = require('./abstractView');

exports.UserView = class UserView extends AbstractView{
  constructor (userInterface) {
    super(userInterface);
  }
  get (request, reply) {
    let userResult = this.interface.get(request.query.email);
    console.log(`GET user result ${userResult}`);
    if (userResult) {
      return reply(userResult);
    } else {
      return reply(createErr("User not found")).code(404);
   }
  }

  post (request, reply) {
    console.log('POST Request payload:', request.payload);
    let userResult = this.interface.insert(request.payload);
    if (userResult) {
      return reply(userResult).code(201);
    } else {
      return reply(createErr("Bad request, User not created")).code(400);
    }
  }

  delete (request, reply) {
    console.log('DELETE Request payload:', request.payload);
    let userResult = this.interface.delete(request.payload);
    if (userResult) {
      return reply(userResult);
    } else {
      return reply(createErr("Bad request, User not created")).code(400);
    }
  }
}
