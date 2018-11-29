const express = require('express')
const db = require('../utils/db')
const promisify = require('../utils/promisify')
const global = require('../utils/global')

const router = express.Router()

/**
 * @api - {POST} - /localization - Link user and trash
 * @apiName - LocalizeUser
 * @apiGroup - Localization
 *
 * @apiParam - {String} position      - Beacon ID (mac address).
 * @apiParam - {String} beacon_data   - Beacon information.
 */
router.post('/', (req, res, next) => {
  
})

module.exports = router
