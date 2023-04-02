class CartDto {
	constructor({ _id, products}) {
		this._id = _id;
		this.products = products;
	}
}

export const convertToCartDto = (carts) => {
	if (Array.isArray(carts)) {
		const newData = carts.map((cart) => new CartDto(cart));
		return newData;
	} else {
		const newData = new CartDto(carts);
		return newData;
	}
};
