const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').OAuthStrategy;






module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/api/login');
};
