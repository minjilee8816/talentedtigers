const passport = require('passport');
const Strategy = require('passport-github').Strategy;
const User = require ('../../database/').User;
require('dotenv').config();

passport.use(new Strategy({
  clientID: process.env.GITHUB_CLIENTID,
  clientSecret: process.env.GITHUB_CLIENTSECRET,
  callbackURL: `${process.env.URL}/api/auth/github/callback`
}, (accessToken, refreshToken, profile, callback) => {
  User.find({
    where: { username: profile.username }
  }).then(user => {
    if (!user) { return callback('Can\'t find user in database'); }
    user.dataValues.avatarUrl = profile.photos[0].value;
    return callback(null, user.dataValues);
  });
}));

passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((user, callback) => {
  User.find({
    where: { username: user.username }
  }).then(user => {
    if (!user) { return callback('failed'); }
    callback(null, user.dataValues);
  });
});

const isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = {
  isAuthenticated: isAuthenticated,
  githubAuth: passport
};
