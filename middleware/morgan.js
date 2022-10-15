const morgan = require('morgan')
const logger = require('../config/logger')

const stream = {
    // use the http severity
    write: (message) => logger.http(message)
}

const skip = () => {
    const env = process.env.NODE_ENV || 'development'
    return env !== 'development'
}

const morganMiddleware = morgan(
    // You can create your custom token to show what do you want from a request.
    ":remote-addr :method :url :status :res[content-length] - :response-time ms",
    // Options: in this case, I overwrote the stream and the skip logic.
    // See the methods above.
    { stream, skip }
)

module.exports = morganMiddleware