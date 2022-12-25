const { Router } = require('express')
const getNumRandoms = require('../helpers/numRandoms')
const { fork } = require('child_process')
const path = require('path')

const randomsRoute = Router()

randomsRoute.get('/', (req, res) => {
    const cant = req.query.cant || 100000000
    const numbers = getNumRandoms(cant)
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


module.exports = randomsRoute