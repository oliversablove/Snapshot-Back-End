const model = require('./model')
const jwt = require('jsonwebtoken')
const userModel = require('../user/model')

module.exports = {
  newpost: (req, res) => {
    let user_id = jwt.decode(req.body.auth_token).id

    userModel.findById(user_id)
      .then(response => {
        if (!response) {
          res.send({ success: false, msg: "User Not Found"})
          return
        }

      let newpost = new model({
        user_id: user_id,
        display_name: response.firstname + ' ' + response.lastname,
        image: req.body.image,
        desc: req.body.desc,
        timestamp: Date.now()
      })

      newpost.save()
        .then(response => {
          res.send({ success: true, response: response })
        })
        .catch(err => {
          if (err) res.send({ success: false, error: err })
        })
    })
  },
  getposts: (req, res) => {
    model.find()
      .then(response => {
        response = response.sort(function(a, b) {
          return b.timestamp - a.timestamp
        })
        res.send(response)
      })
      .catch(err => {
        console.error(err)
      })
  }
}
