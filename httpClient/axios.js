const { default: axios } = require("axios")

const baseUrl = 'http://localhost:8080'

const getProducts = async () => {
    try {
        
        const res = await axios.get(`${baseUrl}/productos`)
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
    
}
getProducts()

// const getProduct = async () => {
//     try {
        
//         const res = await axios.get(`${baseUrl}/productos/1`)
//         console.log(res.data)
//     } catch (error) {
//         console.log(error)
//     }
    
// }
// getProduct()


// const deleteProduct = async () => {
//     try {
        
//         const res = await axios.delete(`${baseUrl}/productos/1`)
//         console.log(res.data)
//     } catch (error) {
//         console.log(error)
//     }
    
// }
// deleteProduct()


// const postProduct = async () => {
//     try {
        
//         const res = await axios.post(`${baseUrl}/productos`, {
//             name: "APPLE WATCH SERIES 3 38MM SPACE GREY",
//             description: "Este mágico dispositivo te permite hacer todo desde tu muñeca: recibir llamadas, enviar mensajes de texto o escuchar tus mensajes de voz. También podrás hablar con tus contactos por Walkie-Talkie y escuchar tu música favorita.",
//             code: 489533,
//             image: "https://home.ripley.com.pe/Attachment/WOP_5/2065233144486/2065233144486_2.jpg",
//             price: 979,
//             stock: 20
//         })
//         console.log(res.data)
//     } catch (error) {
//         console.log(error)
//     }
    
// }
// postProduct()


// const putProduct = async () => {
//     try {
        
//         const res = await axios.put(`${baseUrl}/productos/5`, {
//             stock: 20
//         })
//         console.log(res.data)
//     } catch (error) {
//         console.log(error)
//     }
    
// }
// putProduct()