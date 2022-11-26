// eslint-disable-next-line no-undef
const socketCliente = io()

// page chat
const $butonSubmit = document.getElementById("submit")
const $inputMessage = document.getElementById("input-message")
const $historyMessage = document.getElementById("history-message")
const $text = document.getElementById("text")

// eslint-disable-next-line no-undef
const authorSchema = new normalizr.schema.Entity('authors')
// eslint-disable-next-line no-undef
const messageSchema = new normalizr.schema.Entity('message',{
    author: authorSchema
})
// eslint-disable-next-line no-undef
const chatSchema = new normalizr.schema.Entity('chat', {
  messages: [messageSchema]
})
const user = {
  email: '',
  name: '',
  lastname: ''
}
// eslint-disable-next-line no-undef
Swal.fire({
    title: 'Ingrese su nombre de GitHub',
    html: `
          <input type="text" id="email" class="swal2-input" placeholder="Correo Electronico">
          <input type="text" id="name" class="swal2-input" placeholder="Nombre">
          <input type="text" id="lastname" class="swal2-input" placeholder="Apellido">
          `,
    showCancelButton: false,
    confirmButtonText: 'Look up',
    showLoaderOnConfirm: true,
    allowOutsideClick: false,
    preConfirm: () => {
       // eslint-disable-next-line no-undef
       const email = Swal.getPopup().querySelector('#email').value
      // eslint-disable-next-line no-undef
      const name = Swal.getPopup().querySelector('#name').value
      // eslint-disable-next-line no-undef
      const lastname = Swal.getPopup().querySelector('#lastname').value
      // eslint-disable-next-line no-undef
      if(!email || !name || ! lastname) Swal.showValidationMessage('Por favor rellene todos los campos')
      return{ email, name, lastname}
    },
  }).then((result) => {
    if (result) {
      // eslint-disable-next-line no-undef
      Swal.fire({
        title: `Bienvenido a nuestro chat ${result.value.name}`,
      })
      user.email = result.value.email
      user.name = result.value.name
      user.lastname = result.value.lastname
    }
  })

$butonSubmit.addEventListener("click",()=> {
    const message = $inputMessage.value
    socketCliente.emit("clientMessage",{
        user,
        text: message,
        time_stamp: new Date().toLocaleDateString()
    })
    $inputMessage.value = ''
})

socketCliente.on("messageHistory",(data) => {
  // eslint-disable-next-line no-undef
  const { messages } = normalizr.denormalize(data.result,chatSchema,data.entities)
  let divMessage = ""
  const now = new Date().toLocaleTimeString([],{hour: '2-digit',minute: '2-digit'});
  messages.forEach(item => {
        divMessage += `
        <div class="history-message-div">
          <div class="history-message-container">
              <div class="header-message">
                  <span>${item.author.name}</span>
              </div>
              <div>
                  <span>${item.text}</span>
              </div>
              <span class="hora">${now}</span>
          </div>
        </div>`
        $historyMessage.innerHTML = divMessage
      })
})

$inputMessage.addEventListener("keydown",()=>{
    socketCliente.emit("userEscribiendo",user.name)
})
socketCliente.on("usuarioRecibido",(user)=>{
  $text.textContent = `${user} esta escribiendo...`
    setTimeout(()=>{
      $text.textContent = ""
    },4000)
})