/* eslint-disable no-undef */
const socketCliente = io()

// page chat
const $butonSubmit = document.getElementById("submit")
const $inputMessage = document.getElementById("input-message")
const $historyMessage = document.getElementById("history-message")
const $text = document.getElementById("text")
console.log($historyMessage);
let username = ""
// eslint-disable-next-line no-undef
Swal.fire({
    title: 'Ingrese su nombre de GitHub',
    input: 'text',
    showCancelButton: false,
    confirmButtonText: 'Look up',
    showLoaderOnConfirm: true,
    allowOutsideClick: false,
    preConfirm: (login) => {
      return fetch(`//api.github.com/users/${login}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          // eslint-disable-next-line no-undef
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // eslint-disable-next-line no-undef
      Swal.fire({
        title: `${result.value.login}'s avatar`,
        imageUrl: result.value.avatar_url
      })
      username = result.value.login
    }
  })

$butonSubmit.addEventListener("click",()=> {
    const message = $inputMessage.value
    socketCliente.emit("clientMessage",{
        username,
        message
    })
    $inputMessage.value = ''
})

socketCliente.on("messageHistory",(data) => {
  let divMessage = ""
  const now = new Date().toLocaleTimeString([],{hour: '2-digit',minute: '2-digit'});
    data.forEach(item => {
        divMessage += `
        <div class="history-message-div">
          <div class="history-message-container">
              <div class="header-message">
                  <span>${item.username}</span>
              </div>
              <div>
                  <span>${item.message}</span>
              </div>
              <span class="hora">${now}</span>
          </div>
        </div>`
        $historyMessage.innerHTML = divMessage
      })
})

$inputMessage.addEventListener("keydown",()=>{
    socketCliente.emit("userEscribiendo",username)
})
socketCliente.on("usuarioRecibido",(user)=>{
  $text.textContent = `${user} esta escribiendo...`
    setTimeout(()=>{
      $text.textContent = ""
    },4000)
})