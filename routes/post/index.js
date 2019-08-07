const router = require('express').Router()
const controller = require('./controller')

router.post('/newpost', controller.newpost)

module.exports = router
