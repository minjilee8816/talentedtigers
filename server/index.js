const express = require('express');
const bodyParser = require('body-parser');
const db = require ('../database/');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/'));

app.post('/api/tickets', (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
});

app.listen(3000, () => console.log('listening on port 3000'));
