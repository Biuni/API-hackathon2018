const express = require('express')
const bodyParser = require('body-parser')
const global = require('./utils/global')

const app = express()
const port = global.PORT || 8000
const hostname = global.HOSTNAME || '127.0.0.1'

const connection = require('./routes/connection')
const localization = require('./routes/localization')
const wallet = require('./routes/wallet')
const products = require('./routes/products')
const rewards = require('./routes/rewards')
const user = require('./routes/user')
const notfound = require('./routes/notfound')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))

// Routing
app.use('/', connection)
app.use('/localization', localization)
app.use('/wallet', wallet)
app.use('/products', products)
app.use('/rewards', rewards)
app.use('/user', user)
app.use(notfound)

app.listen(port, hostname, () => {
  console.log(`Live on => ${hostname}\n`)
})

module.exports = app
