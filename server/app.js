require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const morganMiddleware = require('./middleware/morgan')
const compression = require('compression')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()


// all the middlewares
app.use(compression())
app.use(cors())
app.use(morganMiddleware)
app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true}))

app.set('view engine', 'ejs')

// import all the routes here
const user = require('./routes/user')

// route middleware
app.use('/api/v1', user)

app.use('/signup', (req, res, next) => {
    res.render('signup')
})

app.use('/', (req, res, next) => {
    res.status(200).send('Hello From Blog Site')
})


module.exports = app