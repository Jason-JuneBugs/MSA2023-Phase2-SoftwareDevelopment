require("dotenv").config()

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

module.exports = {
  query: (text, params, callback) => {       
    return pool.query(text, params, callback);
  },
  end: () => {
    pool.end();
  },
};