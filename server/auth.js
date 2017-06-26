const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').OAuthStrategy;
const github = require('../config/github.js').GITHUB_API_KEY;






module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/api/login');
};
