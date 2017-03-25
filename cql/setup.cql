-- To run this:
-- login to the docker container:
-- >> docker exec -it <container-name> bash
-- execute this command:
-- cqlsh -f setup.cql

-- Drop if it exists
DROP KEYSPACE IF EXISTS patchwork;

-- Create keyspace if it doesn't exist
CREATE KEYSPACE IF NOT EXISTS patchwork WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor': '1'
};

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS patchwork.notes (
  id uuid,
  user_id uuid,
  date_created timestamp,
  date_modified timestamp,
  note text,
  PRIMARY KEY (id, user_id, date_created)
)
WITH CLUSTERING ORDER BY (user_id ASC, date_created DESC);

-- create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS patchwork.users (
  first_name text,
  last_name text,
  email text,
  PRIMARY KEY (email)
);
