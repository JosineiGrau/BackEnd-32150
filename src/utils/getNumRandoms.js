const getNumRandoms = require('../helpers/numRandoms');

process.on('exit', () => {
    console.log(`worker #${process.pid} | handleGetRandoms cerrado`)
})

process.on('message', msg => {
    console.log(`worker #${process.pid} | handleGetRandoms iniciando la tarea`)
    if (!isNaN(msg)) {
      const numbers = getNumRandoms(msg)
      process.send(numbers)
      console.log(`worker #${process.pid} | handleGetRandoms finalizó la tarea`)
      process.exit()
    }
})

process.send('listo')