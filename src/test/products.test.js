/* eslint-disable no-undef */
import supertest from 'supertest';
import { expect } from 'chai';
import app from '../server.js';

const request = supertest(app)

// prueba de los endpoints de los productos

describe('Api products test', () => {
    it('obtener todos los productos', async () => {
        await request.get('/productos')
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
    })
    it('obtener un producto por el id', async () => {
       await request.get('/productos/5')
       .set("Accept", "application/json")
       .expect("Content-Type", /json/)
       .expect(200)
    })
    it('añadir un nuevo producto', async () => {
        const newProduct = {
            name: 'Iphone 14',
            description: 'Este mágico dispositivo te permite hacer todo desde tu muñeca: recibir llamadas, enviar mensajes de texto o escuchar tus mensajes de voz. También podrás hablar con tus contactos por Walkie-Talkie y escuchar tu música favorita.',
            code: 489533,
            image: 'https://home.ripley.com.pe/Attachment/WOP_5/2065233144486/2065233144486_2.jpg',
            price: 4000,
            stock: 30
        }
        await request.post('/productos')
        .send(newProduct)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
     })
     it('actualizar un producto', async () => {
        const updateProduct = {
            stock: 10
        }
        await request.put('/productos/5')
        .send(updateProduct)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(202)
     })
     it('eliminar un producto', async () => {
        await request.delete('/productos/5')
        .expect(200)
     })
})