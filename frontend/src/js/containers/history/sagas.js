import { takeEvery, put, fork, call, select } from 'redux-saga/effects'
import { getOrders, getTotalOrders } from './selectors'
import { tagOrders, filterOrders, sliceOrders, formatOrders } from './filters'
import { getUrl } from '../../common/utils'
import {
  HISTORY_REQUEST,
  HISTORY_FETCHING,
  HISTORY_RECEIVED,
  HISTORY_COMPLETE,
  HISTORY_REQUEST_FAILED,
  HISTORY_APPLY_FILTER,
  HISTORY_APPLY_FILTER_COMPLETE
} from './actionTypes'

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
    `rest/orders/page/${pageId}/${action.pageSize}/${action.toDate}/${action.fromDate}`
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

export function* applyOrderHistoryFilter(action) {
  console.log('filter', action)
  let orders = yield select(getOrders)
  console.log(orders)
  try {
    orders = yield call(tagOrders, orders)
    orders = yield call(filterOrders, orders, action.filter)
    orders = yield call(sliceOrders, orders, action.nMaxResults)
    orders = yield call(formatOrders, orders)
    yield put({ type: HISTORY_APPLY_FILTER_COMPLETE, orders })
  } catch (err) {
    throw err
  }
}

export function* watcHistory() {
  yield fork(takeEvery, HISTORY_REQUEST, getOrderHistory)
  yield fork(takeEvery, HISTORY_APPLY_FILTER, applyOrderHistoryFilter)
}
