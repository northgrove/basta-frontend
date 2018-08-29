import { put, fork, call, take, race, select } from 'redux-saga/effects'
import {
  POLL_SESSION_START,
  POLL_SESSION_STOP,
  USER_SESSION_REQUEST,
  USER_SESSION_RECEIVED,
  USER_SESSION_REQUEST_FAILED
} from '../actionTypes'

function delay(millis) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), millis)
  })
  return promise
}

export function* pollSessionWorker(action) {
  try {
    yield call(delay, 10000)
    yield put({ type: USER_SESSION_REQUEST })
  } catch (err) {
    yield put({ type: USER_SESSION_REQUEST_FAILED, err })
  }
}

export function* watchPollSession() {
  while (true) {
    yield take(USER_SESSION_RECEIVED)
    yield race([call(pollSessionWorker), take(POLL_SESSION_STOP)])
  }
}
