'use strict';

var _require = require('../database/'),
    db = _require.db,
    Ticket = _require.Ticket,
    User = _require.User;

var _ = require('underscore');
var util = require('../helpers/util');

var createTicket = function createTicket(req, res) {
  Ticket.create(req.body).then(function (result) {
    if (!result) {
      res.sendStatus(500);
    }
    res.sendStatus(201);
  });
};

var findTickets = function findTickets(req, res) {
  var option = {};
  var query = req.query;
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

  var otherfunction = function otherfunction(status) {
    console.log('test', status);
    return status;
  };

  Ticket.findAll({
    where: option,
    include: [{ model: User, as: 'user' }, { model: User, as: 'userClaimed' }],
    order: [[db.literal('CASE\n        WHEN status = \'Claimed\' THEN 1\n        WHEN status = \'Opened\' THEN 2\n        WHEN status = \'Closed\' THEN 3\n        END')], ['updatedAt', 'DESC']]
  }).then(function (result) {
    if (!result) {
      res.sendStatus(404);
    }
    res.send(result);
  });
};

var updateTickets = function updateTickets(req, res) {
  console.log('trying to update tickets: ', req.body);
  if (req.body.status === 'Claimed') {
    req.body.claimedAt = new Date();
  }
  if (req.body.status === 'Closed') {
    req.body.closedAt = new Date();
  }
  Ticket.update(req.body, { where: { id: req.params.id } }).then(function (result) {
    if (!result) {
      res.sendStatus(500);
    }
    res.sendStatus(200);
  });
};

var createUser = function createUser(req, res) {
  User.findOrCreate({ where: req.body }).then(function (user) {
    res.send(true);
  }).catch(function (err) {
    res.send(false);
  });
};

module.exports = {
  createTicket: createTicket,
  findTickets: findTickets,
  updateTickets: updateTickets,
  createUser: createUser
};