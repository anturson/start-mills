const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const authRouter = require('./auth/router');
const objectRouter = require('./objects-router');
const initPassport = require('./auth/passport');

const { getRenderData } = require('./render');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cookieParser());
app.use(expressSession({ secret: 'start-mills' }));
initPassport(app);
app.use('/css', express.static(path.join(__dirname, '..', 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/js', express.static(path.join(__dirname, '..', 'node_modules', 'jquery', 'dist')));
app.use('/js', express.static(path.join(__dirname, '..', 'node_modules', 'popper.js', 'dist')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/auth', authRouter());
app.use('/api/objects', objectRouter());
app.get('/', (req, res) => {
  res.render('index', getRenderData({ user: req.user }));
});
module.exports = app;
