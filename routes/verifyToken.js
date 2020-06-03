const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, 'token');
    req.userValidation = verified;
    next();
  } catch (error) {
    res.status(400).send('invalid Token');
  }
  return null;
};
