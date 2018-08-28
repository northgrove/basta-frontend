import history from '../../common/history'
import { takeEvery, put, fork, call } from 'redux-saga/effects'
import { getUrl, postForm } from '../utils'
import { api } from '../../../../../api/config/config'
import {
  SUBMIT_FORM,
  FORM_SUBMITTING,
  FORM_SUBMIT_SUCCESSFUL,
  FORM_SUBMIT_FAILED
} from './actionTypes'

const url = `${api}`

export function* submitForm(action) {
  let value = ''
  yield put({ type: FORM_SUBMITTING })
  yield history.push('/orders')
  try {
    switch (action.key) {
      case 'iapptools':
        value = yield call(postForm, `${url}/create/iapptools`, action.form)
        break
      case 'developertools':
        value = yield call(postForm, `${url}/create/developertools`, action.form)
        break
      case 'wasnode':
        value = yield call(postForm, `${url}/create/wasnode`, action.form)
        break
    }
    yield put({ type: FORM_SUBMIT_SUCCESSFUL, value })
  } catch (error) {
    yield put({ type: FORM_SUBMIT_FAILED, error })
  }
}

export function* watchForm() {
  yield fork(takeEvery, SUBMIT_FORM, submitForm)
}
