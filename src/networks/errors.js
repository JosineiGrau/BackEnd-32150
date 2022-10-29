import { error } from './responses.js'

export const errors = (err, req, res, next) => {
  const message = err.message || 'Internal server error'
  const status = err.statusCode || 500

  error(req, res, status, message)
}
