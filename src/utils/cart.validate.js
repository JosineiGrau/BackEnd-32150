import error from './setError.js'

export const validateData = (req, res, next) => {
  if (!req.body.id) {
    throw error('id product is required', 400)
  }
  next()
}
