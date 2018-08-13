'use strict'
const express = require('express')
const router = require('./routes/routes')
const { port } = require('./config/config')


const app = express()

app.use(express.static('./dist'))

app.use('/', router)

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: './dist' })
})

app.listen(port, () => {
    console.log(`Basta backend up and running at port ${port}`)
})