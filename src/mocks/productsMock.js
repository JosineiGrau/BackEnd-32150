import { faker } from '@faker-js/faker';

export class ProductsMock {
	constructor() {
		this.products = []
	}

	async generate() {
		for(let i = 0; i < 5; i++){
			const newsProducts = {
				id: i + 1,
				name: faker.commerce.productName(),
				price: faker.commerce.price(),
				image: faker.image.image(100,100),
			};
			this.products.push(newsProducts)
		}
		return this.products
	}
}
