const express = require('express')
const db = require('../utils/db')

const router = express.Router()

/**
 * @api - {GET} - /products - Get all products
 * @apiName - GetProducts
 * @apiGroup - Products
 */
router.get('/', (req, res, next) => {
  db.query('SELECT * FROM `products`', (error, results, fields) => {
    res.json({
      status: (error) ? 0 : 1,
      message: (error) ? `Error! ${error.sqlMessage}` : null,
      result: (error) ? [] : results
    })
  })
})

/**
 * @api - {GET} - /products/get/:id - Get product details
 * @apiName - GetProductDetails
 * @apiGroup - Products
 */
router.get('/get/:id', (req, res, next) => {
  const prodId = req.params.id
  db.query('SELECT * FROM `products` WHERE `id` = ?', [prodId], (error, results, fields) => {
    res.json({
      status: (error) ? 0 : 1,
      message: (error) ? `Error! ${error.sqlMessage}` : null,
      result: (error) ? [] : results
    })
  })
})

/**
 * @api - {GET} - /products/waste/:id - Get waste details
 * @apiName - GetWasteDetails
 * @apiGroup - Products
 */
router.get('/waste/:id', (req, res, next) => {
  const wasteId = req.params.id
  db.query('SELECT * FROM `waste` WHERE `id` = ?', [wasteId], (error, results, fields) => {
    res.json({
      status: (error) ? 0 : 1,
      message: (error) ? `Error! ${error.sqlMessage}` : null,
      result: (error) ? [] : results
    })
  })
})

module.exports = router
