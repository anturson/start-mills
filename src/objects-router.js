const express = require('express');
const debug = require('debug');

const client = require('./db/pg-client');

const log = debug('app');

const getList = async (req, res) => {
  try {
    const result = await client.query('SELECT table_schema,table_name FROM information_schema.tables;');
    res.json(result.rows);
  } catch (err) {
    log(err);
  } finally {
    client.end();
  }
};

module.exports = () => {
  const router = express.Router();

  router.route('/:entityId')
    .get(getList);

  return router;
};
