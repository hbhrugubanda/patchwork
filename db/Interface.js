'use strict';

const db = require('./Client');

exports.Interface = class Interface {
  constructor () {
    this.dbClient = new db.Client();
  }

  get (email) {
    const user = {
      email : email
    }
    return this.dbClient.get(user);
  }

  insert (payload) {
    const user = {
      email : payload.email,
      first_name : payload.firstName,
      last_name : payload.lastName
    }
    return this.dbClient.insert(user);
  }
}
