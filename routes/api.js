var express = require('express')
var router = express.Router()
var connection = require('./mysql.connection.js')

router.get('/', function(req, res, next) {
  connection.query('select user.id as user_id, user.name as user_name, class.name as class_name, class.class_number from user join class on user.class_id = class.id where user.id = 1', (err, rows, fields) => {
    if (err) next(err)

    res.send(rows[0])
  })
})

module.exports = router
