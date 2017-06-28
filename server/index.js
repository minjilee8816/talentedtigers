const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const githubAuth = require('./auth');
const Strategy = require('passport-github').Strategy;
const db = require ('../database/');
const util = require('./helpers/util');
const helper = require('./helper');
require('dotenv').config();

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(githubAuth.initialize());
app.use(githubAuth.session());
app.use(express.static(__dirname + '/../client/'));

app.get('/api/auth/github', githubAuth.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/api/auth/github/callback', githubAuth.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  // console.log('/github/callback: ', req.session.passport);
  res.redirect('/');
});

app.get('/api/users/:id', (req, res) => {
  res.send(req.session.passport);
});

app.get('/api/tickets/:id', (req, res) => {
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
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.put('/api/tickets/:id', (req, res) => {
  if (req.body.status === 'Claimed') {
    req.body.claimedAt = util.getCurrentTime();
  }
  db.Ticket.update(req.body, { where: { id: req.params.id } })
    .then(ticket => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

server.listen(process.env.PORT, () => console.log('listening on port 3000'));

let students = [];
let mentors = [];

io.on('connection', socket => {
  let userId = socket.handshake.headers['user_id'];
  let userRole = socket.handshake.headers['user_role'];
  socket.on('connect', () => {
    if (userRole === 'student') {
      students.push(socket);
    } else if (userRole === 'mentor') {
      mentors.push(socket);
    }
  });

  socket.on('disconnect', () => {
    if (userRole === 'student') {
      students.splice(students.indexOf(socket), 1);
    } else if (userRole === 'mentor') {
      mentors.splice(mentors.indexOf(socket), 1);
    }
  });

  console.log(`there are ${students.length} students and ${mentors.length} mentors connected`);
});
