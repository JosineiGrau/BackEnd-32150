const { logger } = require("../config/logger.config")

const success = (res, status, msg, data) => {
    const statusCode = status || 200
    const statusMessage = msg || 'correct'
    const body = data || {}

    res.status(statusCode).json({
      error: false,
      status: statusCode,
      message: statusMessage,
      data: body
    })
    logger.info({
      msg: statusMessage,
      data:body
    })
}

module.exports = success