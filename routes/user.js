const express = require('express')
const crypto = require('crypto')
const moment = require('moment')
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
  let user_id
  promisify.query('SELECT `id` FROM `user` WHERE `email` = ? AND `password` = ?', [req.body.username, req.body.password])
    .then(userId => {
      if (userId[0] == undefined) {
        return res.json({
          status: 401,
          message: 'Wrong email or password!'
        })
      } else {
        user_id = userId[0].id
        return promisify.query('SELECT COUNT(`token`) AS count FROM `logged` WHERE `id_user` = ?', [user_id])
      }
    }).then(wasLoggedBefore => {
      const timeStamp = moment().utc().format('YYYY-MM-DD HH:mm:ss')
      const newToken = crypto.createHash('md5').update(timeStamp).digest('hex')
      if (wasLoggedBefore[0].count > 0) {
        db.query('UPDATE `logged` SET `token` = ?, `timestamp` = ? WHERE `id_user` = ?', [newToken, timeStamp, user_id], (error, results, fields) => {
          res.json({
            status: (error) ? 401 : 200,
            message: (error) ? `Error! ${error.sqlMessage}` : null,
            result: (error) ? `Token not setted!` : newToken
          })
        })
      } else {
        db.query('INSERT INTO `logged` SET `token` = ?, `timestamp` = ?, `id_user` = ?', [newToken, timeStamp, user_id], (error, results, fields) => {
          res.json({
            status: (error) ? 401 : 200,
            message: (error) ? `Error! ${error.sqlMessage}` : null,
            result: (error) ? `Token not setted!` : newToken
          })
        })
      }
    })
})

module.exports = router
