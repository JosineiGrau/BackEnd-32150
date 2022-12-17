import { Router } from "express";
import { getNumRandoms } from "../helpers/numRandoms.js";
import { fork } from 'child_process'
import { fileURLToPath } from 'url';
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const randomsRoute = Router()

randomsRoute.get('/', (req, res) => {
    const cant = req.query.cant || 100000000
    const numbers = getNumRandoms(cant)
    console.log(numbers)
    res.json({
      numbers
    })
})

randomsRoute.get('/no-bloqueante', (req, res) => {
  const cant = req.query.cant || 100000000
  const computo = fork(path.resolve(__dirname, '../utils/getNumRandoms.js'))
  computo.on('message', numbers => {
    if(numbers === 'listo') {
      computo.send(cant)
    }else {
      res.json({numbers})
    }
  })
})


export {randomsRoute}