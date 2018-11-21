const express = require('express');
const morgan = require('morgan');
const path = require('path');

module.exports = () => {
  const app = express();

  app.use(morgan('tiny'));
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use('/css', express.static(path.join(__dirname, '..', 'node_modules', 'bootstrap', 'dist', 'css')));
  app.use('/js', express.static(path.join(__dirname, '..', 'node_modules', 'bootstrap', 'dist', 'js')));
  app.use('/js', express.static(path.join(__dirname, '..', 'node_modules', 'jquery', 'dist')));
  app.use('/js', express.static(path.join(__dirname, '..', 'node_modules', 'popper.js', 'dist')));

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.get('/', (req, res) => {
    res.render('index', {});
  });
  return app;
};
