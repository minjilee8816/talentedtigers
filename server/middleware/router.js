const express = require('express');
const router = express.Router();
const util = require('../helpers/util');
const db = require ('../../database/controller');
const { isAuthenticated, githubAuth } = require('./auth');
// const pad = require('../helpers/util.js').pad;

router.use(githubAuth.initialize());
router.use(githubAuth.session());
router.use(express.static(__dirname + '/../../client/'));

router.get('/api/auth/github', githubAuth.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/api/auth/github/callback', githubAuth.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

if (process.env.URL !== 'http://127.0.0.1:3000') {
  router.use(isAuthenticated);
}

router.get('/api/tickets', db.findTickets);


// router.get('/api/tickets', (req, res) => {
// let dateStart = new Date(req.query.dateStart);
// let dateObj = dateStart.getFullYear() + '-' + pad(dateStart.getUTCMonth(), 2) + '-' + pad(dateStart.getUTCDate(), 2) + 'T' + pad(dateStart.getUTCHours(), 2) + ':' + pad(dateStart.getUTCMinutes(), 2) + ':' + pad(dateStart.getUTCSeconds(), 2) + '.' + pad(dateStart.getUTCMilliseconds(), 3) + 'Z';
// db.select(req.query.category, req.query.status, dateStart)
//   .then(results => {
//     res.send(results);
//   });
// });

router.get('/api/users/:id', (req, res) => {
  res.send(req.session.passport);
});

router.get('/api/tickets/:id', (req, res) => {
  // db.User.find({ where: { id: req.params.id } })
  //   .then(user => {
  //     switch (user.role) {
  //     case 'student':
  //       return db.Ticket.findAll({
  //         where: { userId: user.id },
  //         include: [ { model: db.User } ]
  //       });
  //     case 'mentor':
  //       return db.Ticket.findAll({
  //         where: { status: 'Opened' },
  //         include: [ { model: db.User } ]
  //       });
  //     case 'admin':
  //       return db.Ticket.findAll({
  //         include: [ { model: db.User } ]
  //       });
  //     default:
  //       throw user;
  //     }
  //   })
  //   .then(result => {
  //     res.send(result);
  //   });
});

router.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/api/tickets', db.createTicket);

router.put('/api/tickets/:id', db.updateTickets);

router.post('/api/users', db.createUser);

module.exports = router;
