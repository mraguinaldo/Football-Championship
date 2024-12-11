const express = require('express')
const routes = require('./routes/index.js')
const cors = require('cors');

const connection = require("./database/code.js")

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))

app.use("/public", express.static("public"));

app.use(express.json())
app.use(routes)

module.exports = app