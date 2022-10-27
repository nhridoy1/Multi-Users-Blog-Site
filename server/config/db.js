const mongoose = require('mongoose')
const logger = require('./logger')

const connectDB = () => {
   try {
        mongoose.connect(process.env.DB_CONNECT)
        logger.info('DB is Connected')
   } catch (err) {
        logger.error(err)
   }
}

module.exports = connectDB