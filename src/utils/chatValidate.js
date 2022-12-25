const error = require('./setError');

const validateData = (req, res, next) => {
  if (!req.body.message) {
    throw error('message is required', 400)
  }
  next()
}

module.exports = validateData