export const success = (req, res, status, msg) => {
    const statusCode = status || 200
    const statusMessage = msg || 'correct'
  
    res.status(statusCode).json({
      error: false,
      status: statusCode,
      body: statusMessage
    })
}
  
export const error = (req, res, status, msg) => {
    const statusCode = status
    const statusMessage = msg
  
    res.status(statusCode).json({
      error: true,
      status: statusCode,
      body: statusMessage
    })
}
  