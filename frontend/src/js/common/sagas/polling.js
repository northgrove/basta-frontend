import { put, call, take, takeEvery } from 'redux-saga/effects'
import { getUrl } from '../utils'
import { api } from '../../../../../api/config/config'
import {
  USER_SESSION_POLLING_START,
  USER_SESSION_POLLING,
  USER_SESSION_ACTIVE,
  USER_SESSION_EXPIRED,
  USER_SESSION_POLLING_STOP
} from '../actionTypes'

const url = `${api}`

const delay = millis => {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), millis)
  })
  return promise
}

export function* pollSessionWorker(action) {
  try {
    yield call(delay, 10000)
    yield call(getUrl, `${url}/user/session`)
    yield put({ type: USER_SESSION_ACTIVE })
  } catch (err) {
    yield put({ type: USER_SESSION_EXPIRED, err })
  }
}

export function* watchPollSession() {
  yield takeEvery(USER_SESSION_POLLING_START, pollSessionWorker)
  yield takeEvery(USER_SESSION_ACTIVE, pollSessionWorker)
}
