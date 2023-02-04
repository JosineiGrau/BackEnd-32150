const { Router } = require('express')
const getNumRandoms = require('../../helpers/numRandoms')
const success = require('../../networks/responses')
const { getNumRandomsNoBloqController } = require('../../controllers/randoms.controller')

const randomsRoute = Router()

randomsRoute.get('/', (req, res) => {
    const cant = req.query.cant || 100000000
    const numbers = getNumRandoms(cant)
    success(res, 200, 'resultado exitoso', numbers)
})

randomsRoute.get('/no-bloqueante', getNumRandomsNoBloqController)


module.exports = randomsRoute