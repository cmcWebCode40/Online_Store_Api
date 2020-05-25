const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv');
const User = require('../models/User');


const { loginValidation, registerValidation } = require('../validate');

const router = express();


router.get('/allusers', async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    res.json({ message: error });
  }
});

// router.use();
router.post('/register', cors(), async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const checkEmailExit = await User.findOne({ email: req.body.email });
  if (checkEmailExit) return res.status(400).send('email already exits');
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.send({ message: 'registration successful' });
  } catch (err) {
    res.status(400).send({ message: err });
  }
  return res.send('registration successful');
});
router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) res.status(400).send({ error: error.details[0].message });
  const userValidation = await User.findOne({ email: req.body.email });
  if (!userValidation) return res.status(400).send('Email does not exit');
  const userPassword = await bcrypt.compare(req.body.password, userValidation.password);
  if (!userPassword) return res.status(400).send('invalid password');
  const token = jwt.sign({ _id: userValidation.id }, 'process.env.TOKEN_SECRET');
  return res.header('auth-token', token).send(token);
});

module.exports = router;
