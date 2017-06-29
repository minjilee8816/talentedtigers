const db = require('./index');
const _ = require('underscore');

const createTicket = (req, res) => {
  db.Ticket.create(req.body)
    .then(result => {
      if (!result) { throw result; }
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

const findTickets = (req, res) => {
  let option = {};
  let query = req.query;
  if (query.role === 'student') {
    option = { userId: query.id };
  } else if (query.role === 'mentor') {
    option = { status: { $or: ['Opened', 'Closed'] } };
  } else if (query.role === 'admin') {
    option = _.omit(query, ['id', 'role']);
  }
  db.Ticket.findAll({
    where: option,
    include: [ { model: db.User } ],
    order: []
  })
    .then(result => {
      if (result.length) { throw result; }
      res.send(result);
    })
    .catch(() => { res.sendStatus(404); });
};

const updateTickets = (req, res) => {
  if (req.body.status === 'Claimed') {
    req.body.claimedAt = new Date();
  }
  if (req.body.status === 'Closed') {
    req.body.closedAt = new Date();
  }
  db.Ticket.update(req.body, { where: { id: req.params.id } })
    .then(ticket => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(500);
    });
};

const createUser = (req, res) => {
  console.log(req.body);
  db.User.create(req.body)  
    .then(result => {
      console.log('RESULT: ', result);
      if (!result) { throw result; }
      res.sendStatus(201);
    })
    .catch(() => { res.sendStatus(500); });
};

module.exports = {
  createTicket: createTicket,
  findTickets: findTickets,
  updateTickets: updateTickets,
  createUser: createUser
};
