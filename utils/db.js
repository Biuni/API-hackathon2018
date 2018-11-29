const mysql = require('mysql')
const global = require('./global')

var db = mysql.createConnection({
  host: global.DB_HOST,
  user: global.DB_USER,
  password: global.DB_PWD,
  database: global.DB_NAME
})

module.exports = db
