'use strict';

exports.AbstractView = class AbstractView {
  constructor (itemInterface) {
    this.interface = itemInterface;
  }
  get (request, reply) {
    /*
      This is a method for the GET method.
    */
    throw 'Not Implemented';
  }

  post (request, reply) {
    /*
      This is a method for the POST method.
    */
    throw 'Not Implemented';
  }

  patch (request, reply) {
    /*
      This is a method for the PATCH method.
    */
    throw 'Not Implemented';
  }

  delete (request, reply) {
    /*
      This is a method for the DELETE method.
    */
    throw 'Not Implemented';
  }
}
