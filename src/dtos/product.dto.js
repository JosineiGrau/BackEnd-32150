class ProductDto {
	constructor({ _id, name, code, price, description, image, stock }) {
		this._id = _id;
		this.name = name;
		this.code = code;
		this.price = price;
		this.description = description;
		this.image = image;
		this.stock = stock;
	}
}

export const convertToProductDto = (products) => {
	if (Array.isArray(products)) {
		const newData = products.map((product) => new ProductDto(product));
		return newData;
	} else {
		const newData = new ProductDto(products);
		return newData;
	}
};
