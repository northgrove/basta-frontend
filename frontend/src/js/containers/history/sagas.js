import { takeEvery, put, fork, call } from 'redux-saga/effects'
import { getUrl } from '../../common/utils'
import { api } from '../../../../../api/src/config/config'
import {
  HISTORY_REQUEST,
  HISTORY_FETCHING,
  HISTORY_RECEIVED,
  HISTORY_COMPLETE,
  HISTORY_REQUEST_FAILED
} from './actionTypes'

const url = `${api}`

const delay = millis => {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), millis)
  })
  return promise
}

export function* getPartialHistory(action, pageId) {
  let value = ''

  value = yield call(
    getUrl,
    `${url}/orders/page/${pageId}/${action.pageSize}/${action.toDate}/${action.fromDate}`
  )
  if (value.length > 0) {
    pageId++
    yield put({ type: HISTORY_RECEIVED, value })
    yield call(delay, 500)
    yield getPartialHistory(action, pageId)
  } else {
    yield put({ type: HISTORY_COMPLETE })
  }
}

export function* getOrderHistory(action) {
  let pageId = 0
  if (!action.toDate) action.toDate = 0
  if (!action.fromDate) action.fromDate = 0
  yield put({ type: HISTORY_FETCHING })
  try {
    yield getPartialHistory(action, pageId)
  } catch (err) {
    yield put({ type: HISTORY_REQUEST_FAILED, err })
  }
}

export function* watcHistory() {
  yield fork(takeEvery, HISTORY_REQUEST, getOrderHistory)
}
