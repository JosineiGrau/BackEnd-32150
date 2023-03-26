import dotenv from 'dotenv'
import { createTransport } from 'nodemailer';

dotenv.config()

const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.TEST_EMAIL,
        pass: process.env.TEST_PASSWORD,
    },
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
})

const emailTemplateRegister = (user) => {
    return `
            <div>
                <h2>Gracias por registrarse a nuestra tienda</h2>
                <strong>Tus datos registrados fueron:</strong>
                <div>
                    <p> <strong>Nombre</strong>: <span>${user.name}</span> </p>
                    <p> <strong>Email</strong>: <span>${user.email}</span> </p>
                    <p> <strong>Dirección</strong>: <span>${user.direction}</span> </p>
                    <p> <strong>Teléfono</strong>: <span>${user.phone}</span> </p>
                    <p> <strong>Edad</strong>: <span>${user.age}</span> </p>
                    <p> <strong>photo</strong>: <span>${user.photo}</span> </p>
                </div>
            </div>
    `
}

const emailTemplateCheckout = (products) => {
    let template;
    products.forEach((item) => {
        const { name, price, image } = item
        template += `
        <div style= "   position: relative;
                        display: flex;
                        flex-flow: column-reverse nowrap;
                        justify-content: space-between;
                        align-items: center;
                        width: 400px;
                        height: 550px;
                        padding: 15px 15px;
                        background-color: white;
        ">
               <div style=" display: flex;
                            flex-flow: column nowrap;
                            justify-content: center;
                            align-items: center;
                ">
                   <p title=${name}>
                       ${name}
                   </p>
                   <p>S/.${price}</p>
               </div>
           <div title=${name} style="   width: 100%;
                                        aspect-ratio: 1/1;
                                        object-fit: contain;
                                        cursor: pointer;
            ">
               <img loading="lazy" src=${image} alt=${name} />
           </div>
       </div>
       
`
    })
    return template
}

const mailOptions = (template, asunto) => {
    return {
        from: 'Servidor de NodeJs',
        to: process.env.TEST_EMAIL,
        subject: asunto,
        html: template
    }
}

export { transporter, mailOptions, emailTemplateRegister, emailTemplateCheckout }