require('dotenv').config()
const app = require('./app')
const connectDB = require('./config/db')
const logger = require('./config/logger')

// database connection
connectDB()

// spin up a server
app.listen(process.env.PORT, () => {
    logger.info(`Server is running on port ${process.env.PORT}`)
})