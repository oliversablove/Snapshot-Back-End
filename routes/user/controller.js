const model = require('./model')
const jwt = require('jsonwebtoken')
const config = require('../../config')

module.exports = {
  login: (req, res) => {
    model.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err

      // broken somewhere in next two lines: connot read property 'comparePassword' of null -> user is null
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) throw err

        if (isMatch) {
          let token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 })
          res.status(200).send({ auth: true, token })
          return
        }

        res.status(500).send({ auth: false, msg: err })
      })
    })
  },

  register: (req, res) => {

    let newUser = new model({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password
    })

    newUser.save()
      .then(response => {
        // res.status(200).send({ msg: 'Register Successful', user_id: response._id })
        console.log(respone)
        let token = jwt.sign({ id: response._id }, config.secret, { expiresIn: 86400 })
        res.status(200).send({ auth: true, token })
      })
      .catch(err => {
        console.error(err)
        res.status(500).send({ auth: false, msg: err })
      })
  }
}
