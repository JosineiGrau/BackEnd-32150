const chatSchema = require('./schema/chat.schema');
const { normalize } = require('normalizr');

const normalizerChat = (data) => {
    const normalizerMessages = normalize({id:'chatHistory', messages: data},chatSchema)
    return normalizerMessages
}

module.exports = normalizerChat