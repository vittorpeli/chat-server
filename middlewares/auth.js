const jwt = require('../utils/jwt');
const createError = require('http-errors');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) {
    return next(createError.Unauthorized('Access token is required'));
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return next(createError.Unauthorized());
  }
  console.log(token);

  await jwt.verifyAccessToken(token).then(user => {
    req.user = user;
    console.log(req.user)
    next();
  }).catch(e => {
    console.error("Error verifying access token:", e);
    next(createError.Unauthorized(e.message))
  })
}

module.exports = auth;