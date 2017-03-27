'use strict';

const { AbstractInterface } = require('./abstractInterface')

exports.UserInterface = class UserInterface extends AbstractInterface {
  constructor (client) {
    super();
    this.client = client;
  }

  get (email) {
    const user = {
      email : email
    }
    return this.client.get(user);
  }

  insert (payload) {
    const user = {
      email : payload.email,
      first_name : payload.firstName,
      last_name : payload.lastName
    }
    return this.client.insert(user);
  }

  delete (payload) {
    const user = {
      email : payload.email
    }
    return this.client.delete(user);
  }
}
