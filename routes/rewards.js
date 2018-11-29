const express = require('express')
const db = require('../utils/db')
const promisify = require('../utils/promisify')

const router = express.Router()

/**
 * @api - {POST} - /rewards - Rewards an user
 * @apiName - RewardsUser
 * @apiGroup - Rewards
 *
 * @apiParam - {String} product_type  - Product's type.
 * @apiParam - {String} trash_token   - User's token.
 */
router.post('/buy', (req, res, next) => {
  if (req.body.product_type === '' || req.body.product_type === undefined ||
    req.body.trash_token === '' || req.body.trash_token === undefined) {
    return res.json({
      status: 0,
      message: 'Error. Try again!'
    })
  }
  promisify.query('SELECT `user_token` FROM `localization` WHERE `trash_token` = ?', [req.body.trash_token])
    .then(userId => {
      var newTransaction = {
        id_user: userId[0].id_user,
        credit: req.body.cost,
        product_id: req.body.id_product
      }
      db.query('INSERT INTO `transaction` SET ?', newTransaction, (error, results, fields) => {
        res.json({
          status: (error) ? 0 : 1,
          message: (error) ? `Error! ${error.sqlMessage}` : null,
          result: (error) ? `Transaction not registered!` : 'Product buyed!'
        })
      })
    })
})

module.exports = router
