'use strict'
const express = require('express')
const path = require('path')


const app = express()

app.use(express.static('./dist'))

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: './dist' })
})

app.listen('8080', () => {
    console.log(`Basta Frontend server up and running at port 8080`)
})