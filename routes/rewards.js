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
 * @apiParam - {String} trash_token   - Trash's token.
 */
router.post('/', (req, res, next) => {
  if (req.body.product_type === '' || req.body.product_type === undefined ||
    req.body.trash_token === '' || req.body.trash_token === undefined) {
    return res.json({
      status: 0,
      message: 'Error. Try again!'
    })
  }
  promisify.query('SELECT `user_token` FROM `localization` WHERE `trash_token` = ? AND in_use = 1', [req.body.trash_token])
    .then(userToken => {
      return promisify.query('SELECT `id_user` FROM `logged` WHERE `token` = ?', [userToken[0].user_token])
    }).then(userId => {

      let credit = 0
      let prodType = 0
      switch (req.body.product_type) {
        // Vetro
        case '0':
          credit = 20
          prodType = 2
          break;
        // Carta
        case '1':
          credit = 5
          prodType = 3
          break;
        // Plastica
        case '2':
          credit = 10
          prodType = 1
          break;
      }

      var newTransaction = {
        id_user: userId[0].id_user,
        credit: credit,
        product_id: prodType,
        trash_token: req.body.trash_token
      }
      db.query('INSERT INTO `transaction` SET ?', newTransaction, (error, results, fields) => {
        res.json({
          status: (error) ? 0 : 1,
          message: (error) ? `Error! ${error.sqlMessage}` : null,
          result: (error) ? `Reward not registered!` : 'Reward earned!'
        })
      })
    })
})
/**
 * @api - {GET} - /rewards/close - Close the trash association
 * @apiName - RewardClose
 * @apiGroup - Rewards
 *
 * @apiParam - {String} trash_token - Trash's token.
 */
router.get('/close/:trash_token', (req, res, next) => {
  promisify.query('SELECT `id` FROM `localization` WHERE `trash_token` = ? AND in_use = 1', [req.params.trash_token])
    .then(localId => {
      db.query('UPDATE `localization` SET `in_use` = 0 WHERE `id` = ?', [localId[0].id], (error, results, fields) => {
        res.json({
          status: (error) ? 0 : 1,
          message: (error) ? `Error! ${error.sqlMessage}` : null,
          result: (error) ? `Not closed!` : 'Association closed!'
        })
      })
    })
})

module.exports = router
