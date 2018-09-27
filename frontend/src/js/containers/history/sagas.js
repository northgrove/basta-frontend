import { takeEvery, put, fork, call, select, take, takeLatest, throttle } from 'redux-saga/effects'
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
  HISTORY_APPLY_FILTER_SLICE,
  HISTORY_APPLY_FILTER_TAG,
  HISTORY_APPLY_FILTER_FILTER,
  HISTORY_APPLY_FILTER_FORMAT,
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
  try {
    let orders = []
    const totalOrders = yield select(getTotalOrders)
    console.log('1')
    if (totalOrders > 0) {
      console.log('2')
      orders = yield select(getOrders, action.nMaxResults)

      console.log('3', orders)
      // yield put({ type: HISTORY_APPLY_FILTER_SLICE})
      // orders = yield call(sliceOrders, orders, action.nMaxResults)
      console.log('4')

      yield put({ type: HISTORY_APPLY_FILTER_TAG })
      orders = yield call(tagOrders, orders)
      yield put({ type: HISTORY_APPLY_FILTER_FILTER })
      orders = yield call(filterOrders, orders, action.filter)
      // yield put({ type: HISTORY_APPLY_FILTER_FORMAT})
      // orders = yield call(formatOrders, orders)
      yield put({ type: HISTORY_APPLY_FILTER_COMPLETE, orders })
    }
  } catch (err) {
    throw err
  }
}

export function* watcHistory() {
  yield fork(takeEvery, HISTORY_REQUEST, getOrderHistory)
  yield fork(takeLatest, HISTORY_APPLY_FILTER, applyOrderHistoryFilter)
}
