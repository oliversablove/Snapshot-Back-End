const express = require('express')
const app = express()

const config = require('./config')
const db = require('./config/database')

const userRouter = require('./routes/user')

const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
}

// Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors)

// Routes
app.use('/user', userRouter)

app.listen(config.port, console.log('Server has started on port http://localhost:%s', config.port))
