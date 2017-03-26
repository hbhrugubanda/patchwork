'use strict';

const cassandra = require('cassandra-driver');
const config = require('../config');

const { DB_KEYSPACE, DB_HOST } = config.settings;

exports.Client = class Client {
  constructor () {
    this.client = new cassandra.Client({contactPoints: [DB_HOST], keyspace: DB_KEYSPACE});
  }

  async get (user) {
    try {
      let statement = `SELECT first_name, last_name, email FROM users WHERE email='${user.email}';`;
      console.log(statement);
      let result = await this.client.execute(statement);
      if ( result.rows.length > 0 ) {
          var userResult = result.rows[0];
          console.log(`name = ${userResult.first_name}, email = ${userResult.email}`);
          return userResult
      } else {
          console.log("No results");
          return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async insert (user) {
    try {
      let result = await client.execute(`INSERT INTO users (email, first_name, last_name) VALUES ('${user.email}', '${user.first_name}', '${user.last_name}')`);
      console.log('inserted a row');
      return true;
    } catch (err) {
      // Run next function in series
      console.log(err);
      return false;
    }
  }

  delete () {
    console.log("delete not implemented.")
  }

  update () {
    console.log("update not implemented.")
  }
}




// Use async series to run functions in serial (one after another)
// async.series([
    // Delete Bob
    // function (callback) {
    //     client.execute("DELETE FROM users WHERE lastname = 'Jones'", function (err, result) {
    //         if (!err) {
    //             console.log("Deleted");
    //         }
    //
    //         // Run next function in series
    //         callback(err, null);
    //     });
    // },
    // Read users and print to the console
    // function (callback) {
    //     client.execute("SELECT * FROM users WHERE lastname='Jones'", function (err, result) {
    //         if ( result.rows.length > 0 ) {
    //             let user = result.rows[0];
    //             console.log("name = %s, age = %d", user.firstname, user.age);
    //         } else {
    //             console.log("No records");
    //         }
    //
    //         // Run next function in series
    //         callback(err, null);
    //     });
    // }
// ], function (err, results) {
//       // All finished, quit
//       process.exit();
// });