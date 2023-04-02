import log4js from 'log4js';

log4js.configure({
    appenders: {
        consola: {type: 'console'},
        error: {type: 'file', filename: './src/logs/error.log'},
        warning: {type: 'file', filename: './src/logs/warn.log'},
        // defino sus niveles de logger
        loggerConsola: {type: 'logLevelFilter', appender: 'consola', level: 'info'},
        loggerError: {type: 'logLevelFilter', appender: 'error', level: 'error'},
        loggerWarning: {type: 'logLevelFilter', appender: 'warning', level: 'warn'},
    },
    categories: {
        default: {appenders: ['loggerConsola', 'loggerError', 'loggerWarning'], level: 'all'},
    }
})

export const logger = log4js.getLogger()