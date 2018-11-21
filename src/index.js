require('dotenv').config();
const debug = require('debug');
const chalk = require('chalk');

const createApp = require('./app');

const log = debug('app');

const app = createApp();
const port = process.env.PORT || 5000;

app.listen(port, () => log(`Running at ${chalk.green(port)}`));
