import parseArgs from 'minimist';

const options = {
	alias: { m: 'mode', p: 'port', db: 'dataBase' },
};

const { mode, port, dataBase } = parseArgs(process.argv.slice(2), options);

export default {
	mode,
	port,
	dataBase,
};
