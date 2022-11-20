import { FirebaseStore } from "../../../store/firebaseStore.js";
import error from "../../../utils/setError.js";

const productos = new FirebaseStore('productos')

export class ProductsFirebase {
    async save(item) {
        const dataCreated = await productos.save(item)
        return dataCreated
    }

    async getAll() {
        const result = await productos.getAll()
        return result
    }
    
    async getById(id) {
        const result = await productos.getById(id)
        if(!result) throw error('product not found', 404)
        return result
    }
    
    async deleteById(id) {
        await this.getById(id)
        const result = await productos.deleteById(id)
        return result
    }

    async update(id, body) {
        await this.getById(id)
        const result = await productos.update(id, body)
        return result
    }
}