const express = require('express')
const token = require('./getAccesstoken')
let multer = require('multer')
let upload = multer()

process.env.BASTAAZURECONFIG_CLIENTID = 'test_client_id'
process.env.BASTAAZURECONFIG_CLIENTSECRET = 'test_client_secret'
process.env.BASTAAZURECONFIG_CALLBACKURI = 'test_reply_url'

const app = express()
const server = app.listen('8081', () => console.log('Starter getToken test Express instans'))

const params = {
  status: 'OK',
  access_token: 'testtoken'
}

const paramsFailed = {
  status: 'failed',
  access_token: 'testtokenFAILED'
}

const reply = JSON.stringify(params)
const replyFailed = JSON.stringify(paramsFailed)

app.post('/', upload.fields([]), (req, res) => {
  if (
    req.body.client_id &&
    req.body.resource &&
    req.body.redirect_uri &&
    req.body.grant_type &&
    req.body.client_secret
  ) {
    res.status(200).send(reply)
    server.close()
  } else {
    res.status(500).send(replyFailed)
    server.close()
  }
})

test('Simulerer getToken fra azure AD', async () => {
  const jau = await token.getAccessToken('http://localhost:8081')
  expect(jau).toContain('testtoken')
})
