import { fork } from 'child_process'
import path from 'path'
import getNumRandoms from '../helpers/numRandoms.js'
import success from '../networks/responses.js'

export const getNumRandomsController = (req, res) => {
    const cant = req.query.cant || 100000000
    const numbers = getNumRandoms(cant)
    success(res, 200, 'resultado exitoso', numbers)
}

export const getNumRandomsNoBloqController = (req, res) => {
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
