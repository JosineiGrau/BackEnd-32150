import error from './setError.js'

export const validateDate = (req, res, next) => {
  if (!req.body.name) {
    throw error('Name is required', 400)
  }

  if (!req.body.description) {
    throw error('Description is required', 400)
  }

  if (!req.body.code) {
    throw error('Code is required', 400)
  }

  if (!req.body.image) {
    throw error('Image is required', 400)
  }

  if (!req.body.price) {
    throw error('Price is required', 400)
  }

  if (!req.body.stock) {
    throw error('Stock is requireds', 400)
  }
  next()
}
