const express = require('express');
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const bodyParser = require('body-parser');
const auth = require('./auth');
const db = require ('../database/');

let GITHUB_CLIENT_ID = '--insert-github-client-id-here--';
let GITHUB_CLIENT_SECRET = '--insert-github-client-secret-here--';

passport.serializeUser((user, done) => {
  console.log('serializeUser: ', user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('deserializeUser: ', id);
  db.User.find({ id: id }).then(result => {
    done(null, result);
  });
});

passport.use(new GithubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecrect: GITHUB_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:3000/api/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);
}));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../client/'));

app.get('/', auth.isAuthenticated, (req, res) => {
  res.locals.user = req.user;
});

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
