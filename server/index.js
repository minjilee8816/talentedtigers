const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-github').Strategy;
const auth = require('./auth');
const db = require ('../database/');
require('dotenv').config();

passport.use(new Strategy({
  clientID: process.env.GITHUB_CLIENTID,
  clientSecret: process.env.GITHUB_CLIENTSECRET,
  callbackURL: 'http://127.0.0.1:3000/api/auth/github/callback'
}, (accessToken, refreshToken, profile, callback) => {
  db.User.find({
    where: { username: profile.username }
  }).then(user => {
    if (!user) { return callback('Can\'t find user in database'); }
    return callback(null, user.dataValues);
  });
}));

passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((user, callback) => {
  db.User.find({
    where: { username: user.username }
  }).then(user => {
    if (!user) { return callback('failed'); }
    callback(null, user.dataValues);
  });
});


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../client/'));


app.get('/api/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/api/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  console.log('/github/callback: ', req.session.passport);
  res.redirect('/');
});

app.get('/api/users/:id', (req, res) => {
  res.send(req.session.passport);
});

app.get('/api/tickets/:id', (req, res) => {
  console.log(req.params);
  db.User.find({ where: { id: req.params.id } })
    .then(user => {
      if (user.role === 'student') {
        return db.Ticket.findAll({ where: { userId: user.id } });
      } else if (user.role === 'mentor') {
        return db.Ticket.findAll({ where: { status: 'Opened' } });
      } else if (user.role === 'admin') {
        return db.Ticket.findAll();
      }
    })
    .then(result => {
      res.send(result);
    });
});

app.get('/api/logout', (req, res) => {
  req.logout();
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
