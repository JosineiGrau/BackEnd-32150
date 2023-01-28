const twilio = require("twilio")
const dotenv = require('dotenv');

dotenv.config()

const accoundId = process.env.DB_ACCOUND_ID
const authToken = process.env.DB_AUTH_TOKEN

const client = twilio(accoundId, authToken);

module.exports = client