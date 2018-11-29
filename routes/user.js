const express = require('express')
const db = require('../utils/db')
const promisify = require('../utils/promisify')

const router = express.Router()

/**
 * @api - {POST} - /user/login - Login an user
 * @apiName - UserLogin
 * @apiGroup - Login
 *
 * @apiParam - {String} username - User email.
 * @apiParam - {String} password - User password.
 */
router.post('/login', (req, res, next) => {
  if (req.body.username === '' || req.body.username === undefined ||
    req.body.password === '' || req.body.password === undefined) {
    return res.json({
      status: 0,
      message: 'Error. Try again!'
    })
  }
  promisify.query('SELECT `id` FROM `user` WHERE `email` = ? AND `password` = ?', [req.body.username, req.body.password])
    .then(userId => {
      if (userId[0].userId === undefined) {
        return res.json({
          status: 401,
          message: 'Wrong email or password!'
        })
      } else {
        return promisify.query('SELECT COUNT(`token`) AS count FROM `logged` WHERE `id_user` = ?', [userId[0].userId])
      }
    }).then(wasLoggedBefore => {
      if (wasLoggedBefore[0].count > 0) {
        
      } else {
        
      }
    })
})

module.exports = router
