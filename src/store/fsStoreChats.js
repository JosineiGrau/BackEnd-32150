const fs = require('fs');
const error = require('../utils/setError');

class FsChatStore {
    constructor(nameFile){
        this.nameFile = nameFile
    }

    addId(data) {
		const ids = data.map((item) => item.id);
		const maxId = Math.max(...ids);
		let addId = maxId === -Infinity ? 0 : maxId;
		addId++;
		return addId;
	}

    async saveMessage(data){
       try {
            if (fs.existsSync(this.nameFile)) {
                const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
                if (contenido) {
                    const arrayMessage = JSON.parse(contenido);
                    const id = this.addId(arrayMessage);
                    const newMessage = {
                        id,
                        author: {
                            id: data.user.email,
                            name: data.user.name,
                            lastname: data.user.lastname,
                        },
                        text: data.text,
                        time_stamp: data.time_stamp,
                    };
                    arrayMessage.push(newMessage);    
                     await fs.promises.writeFile(
                        this.nameFile,
                        JSON.stringify(arrayMessage, null, 2)
                    );
                    return arrayMessage
                    
                } else {
                    const newMessage = {
                        id: 1,
                        username: data.username,
                        message: [data.message]
                    };
                    await fs.promises.writeFile(
                        this.nameFile,
                        JSON.stringify([newMessage], null, 2)
                    );
                    return newMessage;
                }
            } else {
                const newMessage = {
                    id: 1,
                    username: data.username,
                    message: [data.message]
                };
                await fs.promises.writeFile(
                    this.nameFile,
                    JSON.stringify([newMessage], null, 2)
                );
                return newMessage;
            }
       } catch (err) {
            throw error ('Internal Server Error', 500) 
       }
    }

    async getAll() {
		try {
			const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
			const data = JSON.parse(contenido);
			return data
			
		} catch (err) {
            throw error ('Internal Server Error', 500) 
		}
	}
}

module.exports = FsChatStore