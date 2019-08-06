const mongoose = require('mongoose')
const config = require('./index')

const db = mongoose.connect(config.mongo_uri, { useNewUrlParser: true})
  .then(() => console.log('Connected to database'))
  .catch(() => console.error('Error Occured', err))

module.exports = db
