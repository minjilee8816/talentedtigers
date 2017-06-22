const express = require('express');
const path = require('path');
const db = require ('../database/');
const app = express();

app.use(express.static(__dirname + '/../client/'));


app.listen(3000, () => console.log('listening on port 3000'));
