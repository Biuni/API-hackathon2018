const express = require('express')
const db = require('../utils/db')
const promisify = require('../utils/promisify')

const router = express.Router()

/**
 * @api - {GET} - /wallet/transaction/:token - Get transaction of user
 * @apiName - TransactionUser
 * @apiGroup - Wallet
 *
 * @apiParam - {String} token  - User token.
 */
router.get('/transaction/:token', (req, res, next) => {
  const userToken = req.params.token
  let error = 1
  let msgerr = ''
  promisify.query('SELECT `id_user` FROM `logged` WHERE `token` = ?', [userToken])
    .then(userId => {
      if (typeof userId !== 'undefined' && userId.length > 0) {
        return promisify.query('SELECT * FROM `transaction` WHERE `id_user` = ?', [userId[0].id_user])
      } else {
        error = 0
        msgerr = 'User not exist!'
      }
    })
    .then(allTransaction => {
      let total = 0
      if (typeof allTransaction !== 'undefined' && allTransaction.length > 0) {
        allTransaction.forEach(el => {
          if (el.trash_token != null) {
            total = total + parseInt(el.credit)
          } else {
            total = total - parseInt(el.credit)
          }
        })
      } else {
        msgerr = 'No transaction!'
      }
      res.json({
        status: error,
        message: (error === 1) ? null : msgerr,
        result: {
          credit: total,
          transaction: allTransaction
        }
      })
    })
})

/**
 * @api - {POST} - /wallet/buy - Buy an item
 * @apiName - BuyItem
 * @apiGroup - Wallet
 *
 * @apiParam - {String} id_product  - Product's id.
 * @apiParam - {String} cost        - Product's cost.
 * @apiParam - {String} user        - User token.
 */
router.post('/buy', (req, res, next) => {
  if (req.body.id_product === '' || req.body.id_product === undefined ||
    req.body.cost === '' || req.body.cost === undefined ||
    req.body.user === '' || req.body.user === undefined) {
    return res.json({
      status: 0,
      message: 'Error. Try again!'
    })
  }
  promisify.query('SELECT `id_user` FROM `logged` WHERE `token` = ?', [req.body.user])
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
