export const errors = (err, req, res, next) => {
  const statusMessage = err.message || 'Internal server error'
  const statusCode = err.statusCode || 500

  res.status(statusCode).json({
    error: true,
    status: statusCode,
    body: statusMessage
  })
}
 