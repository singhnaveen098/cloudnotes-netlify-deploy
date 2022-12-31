const express = require('express')
const serverless = require('serverless-http');
const cors = require('cors')
const app = express()
const connecttomongo = require('./db')

connecttomongo()

app.use(cors())

app.use(express.json())

//available routes
app.use('/.netlify/functions/index/api/auth', require('./routes/auth'))
app.use('/.netlify/functions/index/api/notes', require('./routes/notes'))

module.exports = app;
module.exports.handler = serverless(app);