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
}
