const twilio = require("twilio")

const accoundId = "AC9cb09b10020279cc39cc3727cb40dce1"
const authToken = "f94790e82af089ef9e60753f258eea09"

const client = twilio(accoundId, authToken);

module.exports = client