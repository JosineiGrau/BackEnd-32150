import error from "../utils/setError.js";
import { Store } from "../../store/chats.store.js";

const chatStore = new Store('chat')

export class Chat {
    constructor(tableName){
        this.tableName = tableName;
    }

    async getAll() {
		try {
            const data = await chatStore.getAll()

		    return data
        } catch (err) {
            console.log('Error DB :',err);
            throw error ('Internal Server Error', 500) 
        }
	}

    async saveMessage(data){
        const newMessage = {
			...data,
		};

		const id = await chatStore.save(newMessage)
		return {
			id,
			...newMessage
		}
               
    }
}