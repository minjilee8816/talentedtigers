const express = require('express');
const bodyParser = require('body-parser');
const db = require ('../database/');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/'));

app.post('/api/auth/login');

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
