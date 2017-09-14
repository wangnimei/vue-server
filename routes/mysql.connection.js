var mysql = require('mysql')

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'wangyu',
  password: '123456789',
  database: 'my_db'
})

module.exports = connection