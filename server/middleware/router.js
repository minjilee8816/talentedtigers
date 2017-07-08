const express = require('express');
const router = express.Router();
const db = require ('../../models');
const { isAuthenticated, githubAuth } = require('./auth');

router.use(githubAuth.initialize());
router.use(githubAuth.session());
router.use(express.static(__dirname + '/../../client/'));

router.get('/api/auth/github', githubAuth.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/api/auth/github/callback', githubAuth.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

router.use(isAuthenticated);

router.get('/api/tickets', db.findTickets);

router.get('/api/users/:id', (req, res) => res.send(req.session.passport));

router.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
router.get('/api/mentors', db.showMentors);

router.post('/api/tickets', db.createTicket);

router.post('/api/users', db.createUser);

router.post('/api/feedbackForm', db.createFeedbackForm);

router.put('/api/tickets/:id', db.updateTickets);

router.post('/api/feedbacks', db.showFeedbacks);


module.exports = router;