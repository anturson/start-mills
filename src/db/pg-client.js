const { Pool } = require('pg');
const debug = require('debug');

const log = debug('app:pg-client');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

const query = async (...args) => {
  let client;
  let res;
  try {
    client = await pool.connect();
    res = await client.query(...args);
  } catch (err) {
    log(err);
  } finally {
    await client.release();
  }
  return res;
};

module.exports = {
  pool,
  query,
};

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });
