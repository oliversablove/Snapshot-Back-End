const model = require('./model')

module.exports = {
  login: (req, res) => {
    res.status(200).send({msg: 'Login Successful'})
  },
  register: (req, res) => {

    let newUser = new model({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password
    })

    newUser.save()
      .then(res => {
        console.log(res)
        res.status(200).send({ msg: 'Register Successful', user_id: res._id })
      })
      .catch(err => {
        res.status(500).send({ msg: 'Register Unsuccessful' })
      })
  }
}
