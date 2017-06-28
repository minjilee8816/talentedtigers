const express = require('express');
const router = express.Router();
const githubAuth = require('./helpers/auth');
const util = require('./helpers/util');
const db = require ('../database/');

router.use(githubAuth.initialize());
router.use(githubAuth.session());
router.use(express.static(__dirname + '/../client/'));

router.get('/api/auth/github', githubAuth.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/api/auth/github/callback', githubAuth.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

router.get('/api/users/:id', (req, res) => {
  res.send(req.session.passport);
});

router.get('/api/tickets/:id', (req, res) => {
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

module.exports = router;
