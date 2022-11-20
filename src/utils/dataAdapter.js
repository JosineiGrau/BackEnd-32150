
export const dataAdaptedFromFirestore = (doc) => {
    const data = doc.data();
  
    const productAdapted = {
      id: doc.id,
      name: data.name,
      price: data.price,
      stock: data.stock,
      img: data.img,
      description: data.description,
    };
    return productAdapted;
  };


export const dataAdapterMongo = (data) => {
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