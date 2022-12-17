import parseArgs from "minimist";

const options = { alias: {m: 'mode', p: 'puerto', d: 'desarrollo'} }

export const args = parseArgs(process.argv.slice(2), options)
