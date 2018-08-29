import history from '../history'
import { takeEvery, put, fork, call } from 'redux-saga/effects'
import { getUrl, postForm } from '../utils'
import { api } from '../../../../../api/config/config'
import {
  SUBMIT_FORM,
  FORM_SUBMITTING,
  FORM_SUBMIT_SUCCESSFUL,
  FORM_SUBMIT_FAILED
} from '../components/actionTypes'

const url = `${api}`

export function* submitForm(action) {
  let value = ''
  yield put({ type: FORM_SUBMITTING })
  yield history.push('/order')
  try {
    switch (action.key) {
      case 'iapptools':
        value = yield call(postForm, `${url}/create/iapptools`, action.orders)
        break
      case 'developertools':
        value = yield call(postForm, `${url}/create/developertools`, action.orders)
        break
      case 'jbossnode':
        value = yield call(postForm, `${url}/create/jbossnode`, action.orders)
        break
      case 'wasnode':
        value = yield call(postForm, `${url}/create/wasnode`, action.orders)
        break
      case 'wildflynode':
        value = yield call(postForm, `${url}/create/wildflynode`, action.orders)
        break
    }
    yield put({ type: FORM_SUBMIT_SUCCESSFUL, value })
  } catch (error) {
    yield put({ type: FORM_SUBMIT_FAILED, error })
  }
}

export function* watchOrder() {
  yield fork(takeEvery, SUBMIT_FORM, submitForm)
}
