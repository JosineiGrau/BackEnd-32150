// eslint-disable-next-line no-undef
const socketCliente = io()


// // page getProducts
const $butonSubmitProducts = document.getElementById('form-post');
const $productTitle = document.getElementById('title');
const $productPrice = document.getElementById('price');
const $productImage = document.getElementById('thumbnail');
const $tBody = document.getElementById('tBody');
console.log($butonSubmitProducts);


$butonSubmitProducts.addEventListener('click',(e) =>{
  e.preventDefault()
  const title = $productTitle.value;
  const price = $productPrice.value;
  const thumbnail = $productImage.value;

  socketCliente.emit('newProduct',{
    title,
    price,
    thumbnail
  })
})
socketCliente.on('productHistory',(data) => {
  console.log(data);
  let divBody = ''
  data.forEach(item => {
    divBody += `
      <tr>
        <th>${item.id}</th>
        <td>${item.title}</td>
        <td>S/.${item.price}</td>
        <td>
          <img src=${item.thumbnail} alt="hola" width="100px"/>
        </td>
      </tr>
    `
    $tBody.innerHTML = divBody
  })

})
