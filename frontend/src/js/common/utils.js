// eslint-disable-next-line
import React from 'react'
const request = require('request-promise')
import { api } from '../../../../api/src/config/config'
// let ms_access_token = ''

export const getUrl = url => {
  console.log('hey ho saga test', url)
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
  const userPhoto = await request.get({
    url: `${api}/user/photo`,
    headers: { userUpn: userUpn }
  })
  // console.log(proxyPhoto)
  return userPhoto
}

export const isAvailable = (access, roles) => {
  if (!access) return true
  let validAccess = false
  roles.forEach(role => {
    if (access.includes(role)) {
      validAccess = true
    }
  })
  return validAccess
}
