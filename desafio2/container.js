const fs = require("fs")

class Container {

    constructor() {
        this.file = {}
    }

    async read(){
        try {
            this.file = JSON.parse(await fs.promises.readFile("./objetos.json","utf-8"))
        } catch (error) {
            this.file = {
                ultimoId : 0,
                productos : []
            }
            this.writeFile()
        }
    }

    async writeFile(){
        try {
            await fs.promises.writeFile("./objetos.json",JSON.stringify(this.file,null,2))
        } catch (error) {
            console.log(error);
        }
    }

    save(object){
        try {
            this.file.ultimoId++

            const newObject = {
                id: this.file.ultimoId,
                ...object,
            }
            this.file.productos.push(newObject)
            this.writeFile()
        } catch (error) {
            console.log(error)
        }
        
    }

    getById(id){
        try {
            return this.file.productos.find(item => item.id === id) || null
        } catch (error) {
            console.log(error);
        }

    }

    getAll(){
        try {
            return this.file.productos;
        } catch (error) {
            console.log(error);
        }

    }
    deleteById(id){
        try {
            this.file.productos = this.file.productos.filter(item => item.id !== id)
            this.writeFile()
        } catch (error) {
            console.log(error);
        }
    }
    deleteAll(){
        try {
            this.file.ultimoId = 0
            this.file.productos = []
            this.writeFile()
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = Container
