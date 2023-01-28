const dataAdapterMongo = (data) => {
  const dataAdapter = {
    name: data.name,
    code: data.code,
    price: data.price,
    description: data.description,
    image: data.image,
    stock: data.stock,
    _id: data._id,
  }
  return dataAdapter
}

module.exports = dataAdapterMongo