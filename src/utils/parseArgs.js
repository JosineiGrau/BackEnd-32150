import parseArgs from 'minimist';

const options = {
	alias: { m: 'mode', p: 'port', e: 'env', db: 'dataBase' },
	default: { mode: 'fork', port: 8080, env: 'DEV', dataBase: 'MONGO' },
};

const { mode, port, env, dataBase } = parseArgs(process.argv.slice(2), options);

export default {
	mode,
	port,
	env,
	dataBase,
};
