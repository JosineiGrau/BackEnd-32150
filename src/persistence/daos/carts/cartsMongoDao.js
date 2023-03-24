import moment from "moment";
import error from "../../../utils/setError.js";
import { MongoStore } from "../../managers/mongo.manager.js";

export class CartsMongoDao extends MongoStore {
    // eslint-disable-next-line no-useless-constructor
    constructor(collectionModel) {
        super(collectionModel)
    }

	async saveCart() {
		try {
            const newCart = {
                timestamp: moment().format('DD/MM/YYYY HH:mm:ss A'),
                products: [],
            };
			const result = await this.collectionModel.create(newCart);
			return result;
		} catch (err) {
			throw error('Internal Server Error', 500);
		}
	}

    async addProductToCart(cartID, product) {
		try {
			const cart = await this.getById(cartID);
            if (cart[0].products.some((item) => item._id.toString() === product[0]._id.toString())) {
                const {products} = cart[0]
                const cartUpdate = products.map((prod) => {
                    if (prod._id.toString() === product[0]._id.toString()) {
                        const productUpdate = {...prod, stock: prod.stock + product[0].stock};
                        return {...productUpdate._doc, stock: productUpdate.stock};
                    } else {
                        return prod;
                    }
                });
                cart[0].products = cartUpdate
            } else {
                cart[0].products.push(product[0])
            }
            cart[0].save();
			return cart;
		} catch (err) {
            console.log(err)
			throw error('Internal Server Error', 500);
		}
	}

	async deleteProductToCart(cart, product) {
		try {
            const { _id: cartId } = cart[0]
            const { _id: productId } = product[0]

            if (cart[0].products.some((item) => item._id.toString() === product[0]._id.toString())) {
                await this.collectionModel.updateOne(
                    { _id: cartId },
                    { $pull: { products: { _id: { $eq: productId } } } },
                    { multi: false, new: true }
                );
                return true
            } else {
                return false
            }
			
			
		} catch (err) {
			throw error('Internal Server Error', 500);
		}
	}
}
