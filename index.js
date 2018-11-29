const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const global = require('./utils/global')

const app = express()
const port = global.PORT || 8000
const hostname = global.HOSTNAME || '127.0.0.1';

const localization = require('./routes/localization')
const notfound = require('./routes/notfound')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))

// Routing
app.use('/localization', localization)
app.use(notfound)

app.listen(port, hostname, () => {
  console.log(`Live on => ${hostname}\n`)
})

module.exports = app
