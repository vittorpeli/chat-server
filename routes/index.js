const express = require('express');
const router = express.Router();
const auth = require('./auth');
const room = require('./rooms');
const createError = require('http-errors');

router.get('/', (req, res) => {
  res.json('Hello World!');
})

router.use('/auth', auth);
router.use('/rooms', room);

router.use((req, res, next) => {
  next(createError.NotFound('Route not Found'))
})

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: false,
    message: err.message,
  })
})

module.exports = router;