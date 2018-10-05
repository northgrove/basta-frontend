import { takeEvery, put, fork, call } from 'redux-saga/effects'
import { getUrl, getUserPhoto } from '../utils'
import {
  SCOPED_RESOURCE_REQUEST,
  SCOPED_RESOURCE_FETCHING,
  SCOPED_RESOURCE_REQUEST_FAILED,
  SCOPED_RESOURCE_RECEIVED,
  RESOURCES_REQUEST,
  RESOURCES_FETCHING,
  RESOURCES_REQUEST_FAILED,
  RESOURCES_RECEIVED,
  ENVIRONMENTS_REQUEST,
  ENVIRONMENTS_FETCHING,
  ENVIRONMENTS_REQUEST_FAILED,
  ENVIRONMENTS_RECEIVED,
  APPLICATIONS_REQUEST,
  APPLICATIONS_FETCHING,
  APPLICATIONS_REQUEST_FAILED,
  APPLICATIONS_RECEIVED
} from '../actionTypes'
//https://basta.adeo.no/rest/v1/fasit/resources?application=abacpdp&bestmatch=true&envClass=q&environment=q3&type=QueueManager
export function* fetchScopedResource(action) {
  yield put({ type: SCOPED_RESOURCE_FETCHING })
  try {
    let resources = yield call(getUrl, `/rest/v1/fasit/resources?envClass=${action.envClass}`)
    yield put({ type: SCOPED_RESOURCE_RECEIVED, value: resources, envClass: action.envClass })
  } catch (err) {
    yield put({ type: SCOPED_RESOURCE_REQUEST_FAILED, err })
  }
}
export function* fetchResources(action) {
  yield put({ type: RESOURCES_FETCHING })
  try {
    let resources = yield call(getUrl, `/rest/v1/fasit/resources?envClass=${action.envClass}`)
    yield put({ type: RESOURCES_RECEIVED, value: resources, envClass: action.envClass })
  } catch (err) {
    yield put({ type: RESOURCES_REQUEST_FAILED, err })
  }
}
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
    yield put({ type: ENVIRONMENTS_RECEIVED, value: environments })
  } catch (err) {
    yield put({ type: ENVIRONMENTS_REQUEST_FAILED, err })
  }
}

export function* watchOrderData() {
  yield fork(takeEvery, ENVIRONMENTS_REQUEST, fetchEnvironments)
  yield fork(takeEvery, APPLICATIONS_REQUEST, fetchApplications)
  yield fork(takeEvery, RESOURCES_REQUEST, fetchResources)
  yield fork(takeEvery, SCOPED_RESOURCE_REQUEST, fetchScopedResource)
}
