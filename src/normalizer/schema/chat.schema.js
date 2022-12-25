const { schema } = require('normalizr');

const authorSchema = new schema.Entity('authors')

const messageSchema = new schema.Entity('message',{
    author: authorSchema
})

const chatSchema = new schema.Entity('chat', {
    messages: [messageSchema]
})

module.exports = chatSchema