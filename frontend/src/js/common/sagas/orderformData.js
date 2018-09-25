import { takeEvery, put, fork, call } from 'redux-saga/effects'
import { getUrl, getUserPhoto } from '../utils'
import {
  ENVIRONMENTS_REQUEST,
  ENVIRONMENTS_FETCHING,
  ENVIRONMENTS_REQUEST_FAILED,
  ENVIRONMENTS_RECEIVED,
  APPLICATIONS_REQUEST,
  APPLICATIONS_FETCHING,
  APPLICATIONS_REQUEST_FAILED,
  APPLICATIONS_RECEIVED
} from '../actionTypes'

export function* fetchApplications() {
  yield put({ type: APPLICATIONS_FETCHING })
  try {
    let applications = yield call(getUrl, '/rest/v1/fasit/applications')
    let filteredApplications = applications.map(application => {
      return application.name
    })
    yield put({ type: APPLICATIONS_RECEIVED, value: filteredApplications })
  } catch (err) {
    yield put({ type: APPLICATIONS_REQUEST_FAILED, err })
  }
}
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
  yield fork(takeEvery, APPLICATIONS_REQUEST, fetchApplications)
}
