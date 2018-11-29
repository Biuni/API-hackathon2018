const db = require('./db')

const query = (sql, args) => {
  return new Promise((resolve, reject) => {
    db.query(sql, args, (err, rows) => {
      if (err) {
        return reject(err)
      }
      resolve(rows)
    })
  })
}

module.exports = { query }
