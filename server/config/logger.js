const winston = require('winston')

const myCustomLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'blue',
        debug: 'white',
    }
}

// Telling winston that i want to link the colors
winston.addColors(myCustomLevels.colors)

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
    // Add the message timestamp with the preferred format
    winston.format.timestamp({ format: 'YYYY-MM-DD-HH:mm:ss' }),

    // tells the winston logs must be colored
    winston.format.colorize(),

    // define the format of the message showing the timestamp, level and the message
    winston.format.printf((info) => `${info.timestamp} ${info.level} ${info.message}`)
)

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    return isDevelopment = env === 'development' ? 'debug' : 'warn'
}

const transports = [
    // allow the use the console to print the message
    new winston.transports.Console(),

    // Allow to print all the error level messages inside the error.log file
    new winston.transports.File({
        level: 'error',
        filename: 'logger/error.log'
    })
]

const logger = winston.createLogger({
   level: level(),
   levels: myCustomLevels.levels,
   format,
   transports
})

module.exports = logger