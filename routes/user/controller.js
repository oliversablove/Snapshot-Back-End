const model = require('./model')
const jwt = require('jsonwebtoken')
const config = require('../../config')

module.exports = {
  login: (req, res) => {
    model.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        res.status(500).send({ auth: false, msg: msg })
        return
      }

      if (!user) {
        res.send({ auth: false, mailError: true, msg: 'Account Does Not Exist' })
        return
      }
      // broken somewhere in next two lines: connot read property 'comparePassword' of null -> user is null
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) throw err

        if (isMatch) {
          // this code works (login code); problem with function
          let token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 })
          res.status(200).send({ auth: true, token })
          return
        } else {
          res.send({ auth: false, passError: true, msg: 'Incorrect Password' })
        }
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
        let token = jwt.sign({ id: response._id }, config.secret, { expiresIn: 86400 })
        res.status(200).send({ auth: true, token })
      })
      .catch(err => {
        if (err.code == 11000) {
          res.send({ auth: false, msg: 'Account Already Exists with this Email' })
          return
        }
        res.send({ auth: false, msg: "Interal Server Error" })
      })
  }
}
