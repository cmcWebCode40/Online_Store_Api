const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

app.use(cors());
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const bagsRoute = require('./routes/bagposts');
const shoesRoute = require('./routes/shoesposts');
const authRoutes = require('./routes/auth');

app.use('/bags', bagsRoute);
app.use('/shoes', shoesRoute);
app.use('/user', authRoutes);
app.get('/', (req, res) => {
  res.send('welcome');
});

mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(4001);
