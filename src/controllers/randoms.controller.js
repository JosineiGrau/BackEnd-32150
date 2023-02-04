const getNumRandoms = require('../helpers/numRandoms')
const success = require('../networks/responses')
const { fork } = require('child_process')
const path = require('path')

const getNumRandomsController = (req, res) => {
    const cant = req.query.cant || 100000000
    const numbers = getNumRandoms(cant)
    success(res, 200, 'resultado exitoso', numbers)
}

const getNumRandomsNoBloqController = (req, res) => {
    const cant = req.query.cant || 100000000
    const computo = fork(path.resolve(__dirname, '../utils/getNumRandoms.js'))
    computo.on('message', numbers => {
      if(numbers === 'listo') {
        computo.send(cant)
      }else {
        success(res, 200, 'resultado exitoso', numbers)
      }
    })
}


module.exports = {
    getNumRandomsController,
    getNumRandomsNoBloqController
}