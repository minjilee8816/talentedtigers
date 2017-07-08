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

router.post('/api/tickets', db.createTicket);

router.post('/api/users', db.createUser);

router.post('/api/feedbackForm', db.createFeedbackForm);

router.put('/api/tickets/:id', db.updateTickets);



var fakeMentorList = [
   {
       "id": 3,
       "firstName": "Saikal",
       "lastName": "Kalmanbetova",
       "username": "Saikal",
       "role": "mentor",
       "cohort": "HRSF-77",
       "rating": 7,
       "createdAt": "2017-07-06T00:50:20.333Z",
       "updatedAt": "2017-07-06T21:10:56.466Z"
   },
   {
       "id": 5,
       "firstName": "Jeffrey",
       "lastName": "Filippello",
       "username": "jeffrey_filippello",
       "role": "mentor",
       "cohort": "HRSF-78",
       "rating": 5,
       "createdAt": "2017-07-06T00:50:20.333Z",
       "updatedAt": "2017-07-07T02:05:43.686Z"
   },
   {
       "id": 15,
       "firstName": "Venus",
       "lastName": "Blackmuir",
       "username": "venus_blackmuir",
       "role": "mentor",
       "cohort": "HRSF-78",
       "rating": 10,
       "createdAt": "2017-07-06T00:50:20.333Z",
       "updatedAt": "2017-07-07T02:34:40.146Z"
   }
]




router.get('/api/mentors', (req, res) => {
  res.send(fakeMentorList);
});


var fakeFeedbackList = [
   {
      id: {
        type: "1",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      rating: 9,
      feedback: "it was great!"
   },
   {
      id: {
        type: "1",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      rating: 3,
      feedback: "bad"
   },
   {
      id: {
        type: "1",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      rating: 5,
      feedback: "it was alright"
   }
]



router.post('/api/feedback', (req, res) => {
  console.log('body*****', req.body);
  res.send(fakeFeedbackList);
});



module.exports = router;