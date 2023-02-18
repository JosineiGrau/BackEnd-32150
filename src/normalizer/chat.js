import { chatSchema } from './schema/chat.schema.js';
import { normalize } from 'normalizr';

export const normalizerChat = (data) => {
    const normalizerMessages = normalize({id:'chatHistory', messages: data},chatSchema)
    return normalizerMessages
}
