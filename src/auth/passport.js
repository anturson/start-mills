const passport = require('passport');
const localStrategy = require('./local-strategy');

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    const err = null;
    done(err, user);
  });

  passport.deserializeUser((user, done) => {
    const err = null;
    done(err, user);
  });

  localStrategy();
};
