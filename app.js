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
  res.send('WELCOME TO LA MORE COLLECTIONZ');
});
// mongoose.connect('mongodb+srv://mike_123:chi2000@cluster0-ksjh1.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://localhost:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 4000;
app.listen(port);
module.exports = app;
