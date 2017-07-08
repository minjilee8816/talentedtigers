const { db, Feedback, Ticket, User } = require('../database/');
const _ = require('underscore');
const util = require('../helpers/util');


const createTicket = (req, res) => {
  Ticket.create(req.body).then(result => {
    if (!result) { res.sendStatus(500); }
    res.sendStatus(201);
  });
};

const createFeedbackForm = (req, res) => {
  console.log("************* req.body: ", req.body);
  Feedback.create(req.body)
    .then(data => {
      if (!data) {
        res.send('Invalid feedback form submission');
      } else {
        Feedback.findAll({where: {claimedBy: req.body.claimedBy}})
        .then(result => {
            console.log("******* result: ", result[0]);
            console.log("******* result[0].dataValues: ", result[0].dataValues);
            console.log("******* result[0].dataValues.rating: ", result[0].dataValues.rating);

           var ratingSum = result.reduce(function(sum, value) {
            return sum + value.dataValues.rating;
           }, 0);
           var averageRate = Number((ratingSum/result.length).toFixed(2));
           console.log("******* averageRate: ", averageRate);
           User.update({rating: averageRate}, {where: {id: req.body.claimedBy}})
          .then(() => {
            res.send('Feedback form successfully created');
          });
        });
      }
    });
};

const findTickets = (req, res) => {
  let option = {};
  let query = req.query;
  if (query.role === 'student') {
    option = { userId: query.id };
  } else if (query.role === 'mentor') {
    option = {
      status: ['Opened', 'Claimed'],
      $or: [{ claimedBy: query.id }, { claimedBy: null }]
    };
  } else if (query.role === 'admin') {
    option = _.omit(query, ['id', 'role']);
  }

  const otherfunction = function(status) {
    return status;
  };

  Ticket.findAll({
    where: option,
    include: [ { model: User, as: 'user' }, { model: User, as: 'userClaimed' } ],
    order: [
      [db.literal(`CASE
        WHEN status = 'Claimed' THEN 1
        WHEN status = 'Opened' THEN 2
        WHEN status = 'Closed' THEN 3
        END`
      )],
      ['updatedAt', 'DESC']
    ]
  }).then(result => {
    if (!result) { res.sendStatus(404); }
    res.send(result);
  });
};

const updateTickets = (req, res) => {
  console.log('trying to update tickets: ', req.body);
  if (req.body.status === 'Claimed') {
    req.body.claimedAt = new Date();
  }
  if (req.body.status === 'Closed') {
    req.body.closedAt = new Date();
  }
  Ticket.update(req.body, { where: { id: req.params.id } })
    .then(result => {
      if (!result) { res.sendStatus(500); }
      res.sendStatus(200);
    });
};

const createUser = (req, res) => {
  User.findOrCreate({ where: req.body })
    .then((user) => {
      res.send(true);
    })
    .catch(err => {
      res.send(false);
    });
};

const showMentors = (req, res) => {
  User.findAll({where: {role: 'mentor' } })
    .then(result => {
      res.send(result);
    });
};

// const showFeedbacks = (req, res) => {
//   Feedback.findAll({where: {claimedBy: req.body.mentorID}})   //might be different mentorID naming!!!
//     .then(result => {
//       res.send(result);
//     });
// };

module.exports = {
  createTicket: createTicket,
  createFeedbackForm: createFeedbackForm,
  findTickets: findTickets,
  updateTickets: updateTickets,
  createUser: createUser,
  showMentors: showMentors,
  showFeedbacks: showFeedbacks
};
