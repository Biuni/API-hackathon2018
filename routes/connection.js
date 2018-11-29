const express = require('express')
const db = require('../utils/db')
const global = require('../utils/global')

const router = express.Router()

/**
 * @api - {GET} - / - Check server and database connection.
 * @apiName - InfoConnection
 * @apiGroup - Connection
 */
router.get('/', (req, res, next) => {
  db.query('SELECT 1 AS test', (error, results, fields) => {
    res.json({
      status: 1,
      database: (error || results.length === 0) ? 'disconnected' : 'connected',
      version: global.VERSION
    })
  })
})

module.exports = router
