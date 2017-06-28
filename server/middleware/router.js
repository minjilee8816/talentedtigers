const express = require('express');
const router = express.Router();
const util = require('../helpers/util');
const db = require ('../../database/');
const { isAuthenticated, githubAuth } = require('./auth');
const pad = require('../helpers/util.js').pad;

router.use(githubAuth.initialize());
router.use(githubAuth.session());
router.use(express.static(__dirname + '/../../client/'));

router.get('/api/auth/github', githubAuth.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/api/auth/github/callback', githubAuth.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

router.use(isAuthenticated);

router.get('/api/users/:id', (req, res) => {
  res.send(req.session.passport);
});

router.get('/api/tickets/:id', (req, res) => {
  db.User.find({ where: { id: req.params.id } })
    .then(user => {
      switch (user.role) {
      case 'student':
        return db.Ticket.findAll({ where: { userId: user.id } });
      case 'mentor':
        return db.Ticket.findAll({ where: { status: 'Opened' } });
      case 'admin':
        return db.Ticket.findAll();
      default:
        throw user;
      }
    })
    .then(result => {
      res.send(result);
    });
});

router.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/api/tickets', (req, res) => {
  db.Ticket.create(req.body)
    .then(result => {
      if (!result) { throw result; }
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

router.put('/api/tickets/:id', (req, res) => {
  if (req.body.status === 'Claimed') {
    req.body.claimedAt = util.getCurrentTime();
  }
  if (req.body.status === 'Closed') {
    req.body.closedAt = util.getCurrentTime();
  }
  db.Ticket.update(req.body, { where: { id: req.params.id } })
    .then(ticket => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

router.post('/api/users', (req, res) => {
  db.User.create(req.body)
    .then(result => {
      if (!result) { throw result; }
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

router.get('/api/tickets', (req, res) => {
  let dateStart = new Date(req.query.dateStart);
  let dateObj = dateStart.getFullYear() + '-' +  pad(dateStart.getUTCMonth(), 2) + '-' +  pad(dateStart.getUTCDate(), 2) + 'T' + pad(dateStart.getUTCHours(), 2) + ':' + pad(dateStart.getUTCMinutes(), 2) + ':' + pad(dateStart.getUTCSeconds(), 2) + '.' + pad(dateStart.getUTCMilliseconds(), 3) + 'Z'; 
  db.select(req.query.category, req.query.status, dateStart)
  .then(results => {
    res.send(results);
  });
})

module.exports = router;
