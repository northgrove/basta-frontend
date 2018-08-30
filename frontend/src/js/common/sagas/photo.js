import { takeEvery, put, fork, call } from 'redux-saga/effects'
import { getUserPhoto } from '../utils'
import { USER_PHOTO_REQUEST, USER_PHOTO_RECEIVED } from '../actionTypes'

export function* fetchPhoto(action) {
  let userPhoto = ''
  userPhoto = yield call(getUserPhoto, action.upn)
  yield put({ type: USER_PHOTO_RECEIVED, userPhoto })
}

export function* watchPhoto() {
  yield fork(takeEvery, USER_PHOTO_REQUEST, fetchPhoto)
}
