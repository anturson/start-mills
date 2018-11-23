const express = require('express');
const debug = require('debug');
const passport = require('passport');

const User = require('../db/user');
const { getRenderData } = require('../render');

const log = debug('app:auth');

const handleSignUpPost = async (req, res) => {
  log(req.body);
  const user = await User.create(req.body);
  req.login(user, () => {
    res.redirect('/');
  });
};

const handleSignInGet = (req, res) => {
  res.render('sign-in', getRenderData({ user: req.user }));
};

const handleSignInPost = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
});

const handleSignOutGet = (req, res) => {
  req.logout();
  res.redirect('/');
};

const handleProfileGet = (req, res) => {
  res.json(req.user);
};

const handleProfileAll = (req, res) => {
  if (!req.user) {
    res.redirect('/');
  } else {
    res.json(req.user);
  }
};

module.exports = () => {
  const router = express.Router();

  router.route('/sign-up')
    .post(handleSignUpPost);

  router.route('/sign-in')
    .get(handleSignInGet)
    .post(handleSignInPost);

  router.route('/sign-out')
    .get(handleSignOutGet);

  router.route('/profile')
    .all(handleProfileAll)
    .get(handleProfileGet);

  return router;
};
