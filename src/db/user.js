const debug = require('debug');

const client = require('./pg-client');

const log = debug('app:db-user');

const create = async (data) => {
  let user;
  try {
    const { login, password } = data;
    const result = await client.query(
      'INSERT INTO users(login, password) VALUES ($1, $2) RETURNING *',
      [login, password],
    );
    [user] = result.rows;
  } catch (err) {
    log(err);
  }
  return user;
};

const find = async (data) => {
  let users;
  try {
    const { login } = data;
    ({ rows: users } = await client.query(
      'SELECT * FROM users WHERE login = $1',
      [login],
    ));
  } catch (err) {
    log(err);
  }
  return users;
};

module.exports = {
  create,
  find,
};
