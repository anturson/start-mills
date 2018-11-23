const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug');
const User = require('../db/user');

const log = debug('app:local-strategy');

module.exports = () => {
  passport.use(new Strategy({
    usernameField: 'login',
    passwordField: 'password',
  }, async (login, password, done) => {
    try {
      const [user] = await User.find({
        login,
      });
      if (user.password === password) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      log(err);
    }
  }));
};
