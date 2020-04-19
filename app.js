const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const bagsRoute = require('./routes/bagposts');
const shoesRoute = require('./routes/shoesposts');

app.use('/bags', bagsRoute);
app.use('/shoes', shoesRoute);
app.get('/', (req, res) => {
  res.send('welcome');
});

mongoose.connect('mongodb://localhost:27017/newsportal', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(4000);
