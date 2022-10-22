const fs = require("fs")

class Message {
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
                    const userNames = arrayMessage.map(data => data.username)
                    if (userNames.includes(data.username)) {
                        const newData = arrayMessage.map(item  => item.username === data.username ? {...item, ...data} : item);
                        await fs.promises.writeFile(
                            this.nameFile,
                            JSON.stringify(newData, null, 2)
                        );
                        return newData
                    }else {
                        const id = this.addId(arrayMessage);
                        const newMessage = {
                            id,
                            username: data.username,
                            message: [data.message]
                        };
                        arrayMessage.push(newMessage);    
                        await fs.promises.writeFile(
                            this.nameFile,
                            JSON.stringify(arrayMessage, null, 2)
                        );
                        return arrayMessage
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
       } catch (error) {
            console.log(error);
       }
    }
    
    async getAll() {
		try {
			const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
			if (contenido) {
				const data = JSON.parse(contenido);
				return data;
			} else {
				throw new Error('No se encontró ningún producto a mostrar');
			}
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports.Message = Message