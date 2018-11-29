const express = require('express')
const router = express.Router()

/**
 * Error. 404 Not Found
 */
router.all('*', (req, res, next) => {
  res.status(404).send({
    status: 0,
    message: 'Request not found!',
    results: {}
  })
})

module.exports = router
