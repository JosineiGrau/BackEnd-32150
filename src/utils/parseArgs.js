import parseArgs from 'minimist';

const options = { alias: {m: 'mode', p: 'port', e: 'env', db: 'dataBase'}, default: {mode: 'fork', port: 8080, env: 'DEV', dataBase: 'MONGO'} }

const args = parseArgs(process.argv.slice(2), options)
console.log(args)

export default args