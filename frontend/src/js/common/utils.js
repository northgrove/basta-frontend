// eslint-disable-next-line
import React from 'react'
const request = require('request-promise')
const config = require('../../../../api/config/passportConfig')
let ms_access_token = ''

export const getUrl = url => {
  const init = {
    credentials: 'include',
    method: 'GET'
  }
  return fetch(url, init).then(res => {
    if (res.ok) {
      const json = res.json().then(json => {
        return json
      })
      return json
    } else {
      throw res.statusText
    }
  })
}
export const postForm = (url, form) => {
  let headers = { 'Content-Type': 'application/json' }
  return fetch(url, {
    headers,
    credentials: 'include',
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(form)
  }).then(res => {
    if (res.ok) {
      const json = res.json().then(json => {
        return json
      })
      return json
    } else {
      throw res.statusText
    }
  })
}

export const getUserPhoto = async userUpn => {
  const proxyPhoto = await request.get({
    url: 'http://localhost:8080/token',
    headers: { userUpn: userUpn }
  })
  // console.log(proxyPhoto)
  return proxyPhoto
}
