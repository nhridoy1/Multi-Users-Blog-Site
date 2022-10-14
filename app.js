require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const morganMiddleware = require('./middleware/morgan')
const app = express()


// all the middlewares
app.use(morganMiddleware)
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


// import all the routes here
const user = require('./routes/user')

// route middleware
app.use('/api/v1', user)

app.use('/', (req, res, next) => {
    res.status(200).send('Hello From Blog Site')
})

module.exports = app