import passport from 'passport';
import passportLocal from 'passport-local';
import users from './users.js';

const { Strategy } = passportLocal;

const strategy = new Strategy(async (username, password, done) => {
  if(!users.findUser(username)) {
    // no such user
    console.log("NOT FOUND");
    return done(null, false, { message: 'Wrong username' });
  }
  if(!users.validatePassword(username, password)) {
    await new Promise((r) => setTimeout(r, 2000)); // two second delay
    return done(null, false, { message: 'Wrong password' });
  }
  return done(null, username);
});

passport.use(strategy);

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
  done(null, user);
});

// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
  done(null, uid);
});

export default {
  configure: (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
  },

  authenticate: (domain, where) => {
    return passport.authenticate(domain, where);
  },
};