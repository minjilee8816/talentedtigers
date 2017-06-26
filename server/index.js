const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-github').Strategy;
const auth = require('./auth');
const db = require ('../database/');
const github = require('../config/github.js').GITHUB_API_KEY;

passport.serializeUser((user, callback) => {
  // console.log('serializeUser: ', user);
  callback(null, user.username);
});

passport.deserializeUser((username, callback) => {
  console.log('deserializeUser: ', username);
  db.User.findAll({
    where: { username: username }
  }).then(result => {
    console.log('deserializeUser result: ', result);
    callback(null, result);
  });
});

passport.use(new Strategy({
  clientID: github.clientID,
  clientSecret: github.clientSecret,
  callbackURL: 'http://127.0.0.1:3000/api/auth/github/callback'
}, (accessToken, refreshToken, profile, callback) => {
  // console.log('accessToken: ', accessToken);
  // console.log('profile: ', profile);
  return callback(null, profile);
}));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../client/'));

// app.get('/', (req, res) => {
//   console.log(github.clientID, github.clientSecrect);
//   // res.locals.user = req.user;
//   res.render()
// });

app.get('/api/login', (req, res) => {

});

app.get('/api/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/api/auth/github/callback', passport.authenticate('github', { failureRedirect: '/api/login' }), (req, res) => {
  res.redirect('/');
});

app.post('/api/tickets', (req, res) => {
  db.Ticket.create(req.body)
    .then(result => {
      if (!result) { throw result; }
      return db.Ticket.findAll();
    })
    .then(tickets => {
      if (!tickets) { throw tickets; }
      res.send(tickets);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.listen(3000, () => console.log('listening on port 3000'));
