const parseArgs = require('minimist');
const options = { alias: {m: 'mode', p: 'puerto', d: 'desarrollo'}, default: {m: 'fork'} }

const args = parseArgs(process.argv.slice(2), options)
console.log(args)

module.exports = args