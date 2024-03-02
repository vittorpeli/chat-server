const jwt = require('jsonwebtoken');
const createError = require('http-errors');
require('dotenv').config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

module.exports = {
  signAccessToken(payload){
    return new Promise((resolve, reject) => {
      jwt.sign({ payload }, accessTokenSecret, {}, (err, token) => {
        if (err) {
          console.error("Error signing access token:", err);
          reject(createError.InternalServerError())
        }
        else {
          resolve(token)
        }
      })
    })
  },
  verifyAccessToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, accessTokenSecret, (err, payload) => {
        if (err) {
          const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
          console.error("Error verifying access token:", err);
          return reject(createError.Unauthorized(message))
        } else {
          resolve(payload)
        }
      })
    })
  }
}