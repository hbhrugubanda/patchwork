const cassandra = require('cassandra-driver');
const async = require('async');

// Create keyspace query
//  CREATE KEYSPACE IF NOT EXISTS demo WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1' }

// Create users table
const KEYSPACE = 'patchwork';
const HOST = '127.0.0.1';

const client = new cassandra.Client({contactPoints: [HOST], keyspace: KEYSPACE});
// Use async series to run functions in serial (one after another)
async.series([
    // Insert Bob
    function (callback) {
        client.execute("INSERT INTO users (email, first_name, last_name) VALUES ('hari.b@example.com', 'Hari', 'B')", function (err, result) {
            // Run next function in series
            if (err) {
              console.log(err);
              return
            }
            console.log('inserted a row');
            callback(err, null);
        });
    },
    // Read users and print to console
    function (callback) {
        client.execute("SELECT first_name, last_name, email FROM users WHERE email='hari.b@example.com'", function (err, result) {
            if (!err){
                if ( result.rows.length > 0 ) {
                    var user = result.rows[0];
                    console.log(`name = ${user.first_name}, email = ${user.email}`);
                } else {
                    console.log("No results");
                }
            } else {
              console.log(err);
              return;
            }


            // Run next function in series
            callback(err, null);
        });
    }
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
], function (err, results) {
      // All finished, quit
      process.exit();
});
