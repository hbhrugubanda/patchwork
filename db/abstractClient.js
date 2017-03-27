'use strict';

exports.AbstractClient = class AbstractClient {
  constructor (client) {
    this.client = client;
  }

  async get (item) {
    /*
      This is a method to get an item using the client.
    */
    throw 'Not Implemented';
  }

  async insert (item) {
    /*
      This is a method to insert an item using the client.
    */
    throw 'Not Implemented';
  }

  async delete (item) {
    /*
      This is a method to delete an item using the client.
    */
    throw 'Not Implemented';
  }

  async update (item) {
    /*
      This is a method to update an item using the client.
    */
    throw 'Not Implemented';
  }
}
