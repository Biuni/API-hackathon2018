const express = require('express')
const db = require('../utils/db')

const router = express.Router()

/**
 * @api - {POST} - /localization - Link user and trash
 * @apiName - LocalizeUser
 * @apiGroup - Localization
 *
 * @apiParam - {String} trash - Trash token.
 * @apiParam - {String} user  - User token.
 */
router.post('/', (req, res, next) => {
  if (req.body.trash === '' || req.body.trash === undefined ||
    req.body.user === '' || req.body.user === undefined) {
    return res.json({
      status: 0,
      message: 'Error. Try again!'
    })
  }
  var newLink = {
    trash_token: req.body.trash,
    user_token: req.body.user,
    in_use: 1
  }
  db.query('INSERT INTO `localization` SET ?', newLink, (error, results, fields) => {
    res.json({
      status: (error) ? 0 : 1,
      message: (error) ? `Error! ${error.sqlMessage}` : null,
      result: (error) ? `User not localized!` : 'User localized!'
    })
  })
})

/**
 * @api - {POST} - /localization/check/:token - Link user and trash
 * @apiName - CheckUserLocalize
 * @apiGroup - Localization
 *
 * @apiParam - {String} user  - User token.
 */
router.get('/check/:token', (req, res, next) => {
  db.query('SELECT COUNT(*) AS associated FROM `localization` WHERE `in_use` = 1', [req.params.token], (error, results, fields) => {
    res.json({
      status: (error) ? 0 : 1,
      message: (error) ? `Error! ${error.sqlMessage}` : null,
      result: (results[0].associated > 0) ? 1 : 0
    })
  })
})

module.exports = router
