import { takeEvery, put, fork, call } from 'redux-saga/effects'
import { getUrl, getUserPhoto } from '../utils'
import {
  ENVIRONMENTS_REQUEST,
  ENVIRONMENTS_FETCHING,
  ENVIRONMENTS_REQUEST_FAILED,
  ENVIRONMENTS_RECEIVED
} from '../actionTypes'

export function* fetchEnvironments(action) {
  yield put({ type: ENVIRONMENTS_FETCHING })
  try {
    let environments = yield call(getUrl, '/rest/v1/fasit/environments')
    let filteredEnvironments = environments
      .filter(environment => {
        return environment.envClass === action.environmentClass
      })
      .map(env => {
        return env.name
      })
    yield put({ type: ENVIRONMENTS_RECEIVED, value: filteredEnvironments })
  } catch (err) {
    yield put({ type: ENVIRONMENTS_REQUEST_FAILED, err })
  }
}

export function* watchOrderData() {
  yield fork(takeEvery, ENVIRONMENTS_REQUEST, fetchEnvironments)
}
