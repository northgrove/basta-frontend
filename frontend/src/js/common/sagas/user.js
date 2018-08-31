import { takeEvery, put, fork, call } from 'redux-saga/effects'
import { getUrl, getUserPhoto } from '../utils'
import { api } from '../../../../../api/config/config'
import {
  USER_PROFILE_REQUEST,
  USER_PROFILE_FETCHING,
  USER_PROFILE_RECEIVED,
  USER_PROFILE_REQUEST_FAILED
} from '../actionTypes'

const url = `${api}`

export function* fetchUserProfile() {
  let value = ''
  let userPhoto = ''
  yield put({ type: USER_PROFILE_FETCHING })
  try {
    value = yield call(getUrl, `${url}/user/profile`)
    yield put({ type: USER_PROFILE_RECEIVED, value })
  } catch (err) {
    yield put({ type: USER_PROFILE_REQUEST_FAILED, err })
  }
}

export function* watchUser() {
  yield fork(takeEvery, USER_PROFILE_REQUEST, fetchUserProfile)
}
